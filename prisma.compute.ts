import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "theiaverse-backend",
    framework: "hono",
    httpPort: 8080,
    env: ".env",
  },
});
