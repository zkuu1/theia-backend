import { Prisma, PrismaClient, type User } from "@/generated/prisma/client"
import {
    type UserData,
    type ApiResponse,

    type RegisterUserRequest,
    type LoginUserRequest,
    toUserResponse,
    toListUserResponse,
    toUserData,
} from "@/dto/users/user.dto"
import type { PaginationMeta } from "@/dto/pagination.dto"

import { HTTPException } from "hono/http-exception"
import bcrypt from 'bcrypt'
import { UserRepository, type UserWithRelations } from "./user.repository"

// i18n
import type { tFunction } from "@/libs/i18n"
import { ONE_DAY, redis, THREE_DAY } from "@/helpers/redis"
import { generateUserToken } from "@/helpers/jwt"


export class UserService {

  static async register(
      prisma: PrismaClient,
      data: RegisterUserRequest,
      t: tFunction
): Promise<ApiResponse<UserData>> {
  try {
    const password = await bcrypt.hash(
      data.password,
      10
    )

    const user =
      await UserRepository.createUser(
        prisma,
        {
          name: data.name,
          email: data.email,
          password,

          role: "user",
          level: 1,
          xp: 0,
          isBan: false,
        }
      )

    return toUserResponse(
      user,
      t("user.created")
    )
  } catch (error) {
    if (
      error instanceof
        Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new HTTPException(
        400,
        {
         message: t("user.emailExists")
        }
      )
    }

    throw error
  }
}

    static async login(
      prisma: PrismaClient,
      data: LoginUserRequest,
      t: tFunction
    ): Promise<ApiResponse<UserData>> {

     const user = await UserRepository.findByEmailWithRelation(prisma, data.email)

      if (!user) {
        throw new HTTPException(
          401, {
            message: t("auth:invalidCredentials")
          }
        )
      }

      const isValid = bcrypt.compare(
        data.password,
        user.password
      )

      if (!isValid) {
        throw new HTTPException (
          401, {
            message: t("auth:invalidCredentials")
          }
        )
      }

      const token = generateUserToken({
        id: user.id,
        name: user.name as string,
        role: user.role
      })

      await redis.set(`sessions: ${user.id}`, token, 
        { ex: THREE_DAY}
      )

      return toUserResponse (
        user,
        t("auth:loginSuccess"),
        token
      )
    }

    static async getAllUsers(
        prisma: PrismaClient,
        page: number = 1,
        limit: number = 10,
        t: tFunction
    ): Promise<ApiResponse<UserData[], PaginationMeta>> {

        const { users, total } =
        await UserRepository.getAllUsers(
            prisma,
            { page, limit }
        );

        const cacheKey = `users:${page}:${limit}`;
        const cached = await redis.get<{ users: UserWithRelations[], total: number }>(cacheKey);
        
        if (cached) {
            return toListUserResponse(
            t("user.fetched"),
            cached.users,
            toUserData,
            cached.total,
            page,
            limit
        );
        }

        await redis.set (
            cacheKey,
            {
              users,
              total
            },
             {ex: ONE_DAY}
           )


        return toListUserResponse(
            t("user.fetched"),
            users,
            toUserData,
            total,
            page,
            limit
        )
    }
}