import {Prisma, PrismaClient } from "@/generated/prisma/client"

export class UserRepository {

    

    static findByName (prisma: PrismaClient, name: string) {
        return prisma.user.findFirst({
            where: {
              name
            },
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

    static findByEmail(prisma: PrismaClient, email: string) {
        return prisma.user.findUnique({
            where: {
                email
            },
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

    static findById(prisma: PrismaClient, id: string) {
        return prisma.user.findUnique({
            where: {id},
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

    static countByEmail(prisma: PrismaClient, email: string) {
        return prisma.user.count({
            where: {email},
        })
    }

    static getAllUser(prisma: PrismaClient) {
        return prisma.user.findMany({
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

    static createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
        return prisma.user.create({
            data,
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

    static updateUser(prisma: PrismaClient, id: string, data: Prisma.UserUpdateInput) {
        return prisma.user.update({
            where: {id},
            data,
            include: {
                subscription: true,
                histories: true,
                comments: true,
                likes: true,
                favourites: true,
            }
        })
    }

     static deleteUser(prisma: PrismaClient, id: string) {
            return prisma.user.delete({
                where: {id}
            })
        }

}

