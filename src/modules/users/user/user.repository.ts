import {
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client";



const userInclude = {
  subscriptions: true,
  histories: true,
  comments: true,
  likes: true,
  favourites: true,
} satisfies Prisma.UserInclude;

export type UserWithRelations =
  Prisma.UserGetPayload<{
    include: typeof userInclude;
  }>;

type UpdateUserParams = {
  id: string;
  data: Prisma.UserUpdateInput;
};

type GetAllUserParams = {
  page: number;
  limit: number;
};

export class UserRepository {
  static findByEmail(
    prisma: PrismaClient,
    email: string
  ) {
    return prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  static findByEmailWithRelation(
    prisma: PrismaClient,
    email: string
  ) {
    return prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
      include: userInclude,
    });
  }

  static findById(
    prisma: PrismaClient,
    id: string
  ) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  static findByIdWithRelation(
    prisma: PrismaClient,
    id: string
  ) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: userInclude,
    });
  }

  static countByEmail(
    prisma: PrismaClient,
    email: string
  ) {
    return prisma.user.count({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  static getAllUsers(
    prisma: PrismaClient,
    {
      page,
      limit,
    }: GetAllUserParams
  ) {
    const skip = (page - 1) * limit;

    return prisma.user.findMany({
      skip,
      take: limit,
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: userInclude,
    });
  }

  static createUser(
    prisma: PrismaClient,
    data: Prisma.UserCreateInput
  ) {
    return prisma.user.create({
      data,
      include: userInclude,
    });
  }

  static updateUser(
    prisma: PrismaClient,
    {
      id,
      data,
    }: UpdateUserParams
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
      include: userInclude,
    });
  }

  static banUser(
    prisma: PrismaClient,
    id: string
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        isBan: true,
      },
    });
  }

  static unbanUser(
    prisma: PrismaClient,
    id: string
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        isBan: false,
      },
    });
  }

  static softDeleteUser(
    prisma: PrismaClient,
    id: string
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}