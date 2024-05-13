import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogRouter} from "./routes/blogRouter";
import { userRouter } from "./routes/userRouter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
