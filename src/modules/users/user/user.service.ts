import { Prisma, PrismaClient, type User } from "@/generated/prisma/client"
import {
    type UserData,
    type ApiResponse,

    type RegisterUserRequest,
    type LoginUserRequest,
    toUserResponse,
    type toListUserResponse
} from "@/dto/users/user.dto"

import { HTTPException } from "hono/http-exception"
import bcrypt from 'bcrypt'
import { UserRepository } from "./user.repository"



export class UserService {

    static async register(
  prisma: PrismaClient,
  data: RegisterUserRequest
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

          role: "USER",
          level: 1,
          xp: 0,
          isBan: false,
        }
      )

    return toUserResponse(
      user,
      "User Created Successfully"
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
          message:
            "Email Already Exists"
        }
      )
    }

    throw error
  }
}
    static async getAllUser(prisma: PrismaClient) {
        const users = await UserRepository.getAllUsers(prisma, {
            page: 1,
            limit: 10
        })
    }
}