import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const payload = {
      id: user.id,
      username: body.username,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json({ message: "User Crested", token });
  } catch (e) {
    console.log(e);
    return c.text("Something went wrong");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Incorrect Creds" });
    }

    const payload = {
      id: user.id,
      username: body.username,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json({ message: "SignIn Success", token });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.text("Something went wrong");
  }
});
