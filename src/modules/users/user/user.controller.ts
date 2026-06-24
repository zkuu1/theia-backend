import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import withPrisma from "../../../libs/prisma.js";
import { UserValidation } from "./user.validation.js";
import { UserService } from "./user.service.js";

import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { requireRole } from "../../../middlewares/admin.middleware.js";

import { ONE_DAY, redis } from "../../../helpers/redis.js";
import type { AppContext } from "@/context/context.js";

const userController = new Hono<AppContext>;

userController.get('/user', withPrisma, async(c) => {
    const cacheKey = "users:all"
    const cachedData = await redis.get(cacheKey)
    if (cachedData) {
        c.header("x-cache", "HIT")
        return c.json(cachedData, 200);
    }

    const prisma = c.get('prisma')
    const page = Number(c.req.query('page') ?? 1)
    const limit = Number(c.req.query('limit') ?? 10)
    const response = await UserService.getAllUsers(prisma, page, limit)
    
    c.header("x-cache", "MISS")
    await redis.set(cacheKey, response, { ex: ONE_DAY })
    return c.json(response, 200)
} )

export default userController;