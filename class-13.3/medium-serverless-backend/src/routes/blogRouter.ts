import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.put("/", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("//bulk", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono!");
});
