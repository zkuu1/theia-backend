import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting seeding...");

    await prisma.like.deleteMany({});
    await prisma.favourite.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.history.deleteMany({});
    await prisma.subscription.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Cleared existing data.");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password123", saltRounds);

    const admin = await prisma.user.create({
        data: {
            email: "admin@theiaverse.com",
            name: "Admin Theia",
            password: hashedPassword,
            role: "admin",
            level: 10,
            xp: 5000,
        },
    });

    const user1 = await prisma.user.create({
        data: {
            email: "user1@theiaverse.com",
            name: "John Doe",
            password: hashedPassword,
            role: "user",
            level: 2,
            xp: 150,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "user2@theiaverse.com",
            name: "Jane Smith",
            password: hashedPassword,
            role: "user",
            level: 5,
            xp: 800,
        },
    });

    console.log("Seeded users.");

    await prisma.subscription.createMany({
        data: [
            {
                userId: user1.id,
                name: "Premium Monthly",
                status: "active",
            },
            {
                userId: user2.id,
                name: "VIP Yearly",
                status: "active",
            },
        ],
    });

    console.log("Seeded subscriptions.");


    await prisma.history.createMany({
        data: [
            {
                userId: user1.id,
                animeId: "12345",
                episode: "1",
                completedList: "true",
            },
            {
                userId: user1.id,
                animeId: "12345",
                episode: "2",
                completedList: "false",
            },
            {
                userId: user2.id,
                animeId: "67890",
                episode: "12",
                completedList: "true",
            },
        ],
    });

    console.log("Seeded histories.");


    await prisma.comment.createMany({
        data: [
            {
                userId: user1.id,
                animeId: "12345",
                comments: "Wow, episode 1 was amazing!",
            },
            {
                userId: user2.id,
                animeId: "12345",
                comments: "I agree, the animation is top tier.",
            },
            {
                userId: user2.id,
                animeId: "67890",
                comments: "Best season finale ever!",
            },
        ],
    });

    console.log("Seeded comments.");


    await prisma.favourite.createMany({
        data: [
            {
                userId: user1.id,
                animeId: "12345",
                isFavourite: true,
            },
            {
                userId: user2.id,
                animeId: "12345",
                isFavourite: true,
            },
            {
                userId: user2.id,
                animeId: "67890",
                isFavourite: true,
            },
        ],
    });

    console.log("Seeded favourites.");

 
    await prisma.like.createMany({
        data: [
            {
                userId: user1.id,
                animeId: "12345",
                isLiked: true,
            },
            {
                userId: user2.id,
                animeId: "12345",
                isLiked: true,
            },
        ],
    });

    console.log("Seeded likes.");
    console.log("Seeding finished successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
