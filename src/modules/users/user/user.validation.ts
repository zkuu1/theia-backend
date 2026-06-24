import z from "zod";
import type { tFunction } from "@/libs/i18n";

export class UserValidation {
  static readonly register = (
    t: tFunction
  ) =>
    z.object({
      name: z
        .string()
        .trim()
        .min(1, {
          message: t(
            "validation.required",
            {
              field: t(
                "validation.fields.name"
              ),
            }
          ),
        })
        .max(50, {
          message: t(
            "validation.max",
            {
              field: t(
                "validation.fields.name"
              ),
              count: 50,
            }
          ),
        }),

      email: z
        .string()
        .trim()
        .min(1, {
          message: t(
            "validation.required",
            {
              field: t(
                "validation.fields.email"
              ),
            }
          ),
        })
        .max(100, {
          message: t(
            "validation.max",
            {
              field: t(
                "validation.fields.email"
              ),
              count: 100,
            }
          ),
        })
        .email({
          message: t(
            "validation.invalidEmail"
          ),
        }),

      password: z
        .string()
        .min(8, {
          message: t(
            "validation.min",
            {
              field: t(
                "validation.fields.password"
              ),
              count: 8,
            }
          ),
        })
        .max(72, {
          message: t(
            "validation.max",
            {
              field: t(
                "validation.fields.password"
              ),
              count: 72,
            }
          ),
        }),
    });

  static readonly login = (
    t: tFunction
  ) =>
    z.object({
      email: z
        .string()
        .trim()
        .min(1, {
          message: t(
            "validation.required",
            {
              field: t(
                "validation.fields.email"
              ),
            }
          ),
        })
        .max(100, {
          message: t(
            "validation.max",
            {
              field: t(
                "validation.fields.email"
              ),
              count: 100,
            }
          ),
        })
        .email({
          message: t(
            "validation.invalidEmail"
          ),
        }),

      password: z
        .string()
        .min(1, {
          message: t(
            "validation.required",
            {
              field: t(
                "validation.fields.password"
              ),
            }
          ),
        })
        .max(72, {
          message: t(
            "validation.max",
            {
              field: t(
                "validation.fields.password"
              ),
              count: 72,
            }
          ),
        }),
    });
}