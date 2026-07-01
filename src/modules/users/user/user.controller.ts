import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import withPrisma from "../../../libs/prisma.js";
import { UserValidation } from "./user.validation.js";
import { UserService } from "./user.service.js";

import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { requireRole } from "../../../middlewares/admin.middleware.js";

import { ONE_DAY, redis } from "../../../helpers/redis.js";
import type { AppContext } from "@/context/context.js";
import { i18nMiddleware } from "@/middlewares/i18n.middleware.js";

const userController = new Hono<AppContext>;

userController.get(
    "/user",
    withPrisma,
    i18nMiddleware,
    async (c) => {
        const prisma = c.get("prisma");
        const t = c.get("t");

        const page = Number(c.req.query("page") ?? 1);
        const limit = Number(c.req.query("limit") ?? 10);

        const response = await UserService.getAllUsers(
            prisma,
            page,
            limit,
            t
        );

        return c.json(response);
    }
);

export default userController;