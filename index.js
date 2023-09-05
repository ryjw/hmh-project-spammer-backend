import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/messages", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.send({ success: true, messages });
});

app.post("/messages", async (req, res) => {
  const { text, parentId } = req.body;
  const newMessage = await prisma.message.create({
    data: {
      text,
      parentId,
    },
  });
  res.send(newMessage);
});

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
