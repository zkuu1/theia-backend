import { createMiddleware } from "hono/factory";
import { getFixedT, type tFunction } from "@/libs/i18n";

type Variables = {
    t: tFunction
}

export const i18nMiddleware = createMiddleware <{ Variables: Variables }>(
    async (c, next) => {
      const locale =
        c.req.header(
          "Accept-Language"
        ) ?? "en";

      c.set(
        "t",
        getFixedT(locale)
      );

      await next();
    }
  );