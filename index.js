import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/messages", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: {
        children: {
          include: {
            children: {
              include: { children: { include: { children: true } } },
            },
          },
        },
      },
    });
    res.send({ success: true, messages });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const { text, parentId } = req.body;
    if (!text) {
      return res.send({ success: false, error: "Please include some text" });
    }
    const message = await prisma.message.create({
      data: {
        text,
        parentId,
      },
    });
    res.send({ success: true, message });
  } catch (error) {
    res.send({ success: true, error: error.message });
  }
});

app.put("/messages/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text, likes } = req.body;
    const isPresent = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!isPresent) {
      return res.send({ success: false, error: "no such ID found" });
    }

    if (!text && likes === undefined) {
      return res.send({
        success: false,
        error: "please include either likes or text",
      });
    }

    const message = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        likes,
        text,
      },
    });
    res.send({ success: true, message });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.delete("/messages/:messageId", async (req, res) => {
  const { messageId } = req.params;
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!message) {
      return res.send({ success: false, error: "no such ID found" });
    }

    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    res.send({ success: true, message });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

const port = 10000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
