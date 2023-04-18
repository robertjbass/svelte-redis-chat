import express from "express";
import { createServer } from "http";
import { Server } from "ws";

const app = express();
const server = createServer(app);
const port = 3000;

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    const { username, message } = JSON.parse(data as any);
    console.log("Message received: ", message);
    ws.send(`${username}: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
