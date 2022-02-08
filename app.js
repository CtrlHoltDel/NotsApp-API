require("dotenv").config({ path: `${__dirname}/.env` });

const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const { urlencoded } = require("body-parser");

const db = require("./mongoDB/config");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const { twilioError, serverError } = require("./errors/errors");
const usersRouter = require("./routers/users");
const messagesRouter = require("./routers/messages");
const { addUser } = require("./models/user");
const { addMessage } = require("./models/messages");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json());

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`socket: ${socket.id} - connected`);
});

app.get("/", async (req, res, next) => {
  res.send("connected");
});

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.post("/messages/receive-message", async (req, res, next) => {
  try {
    console.log(Object.keys(req.body));
    const {
      From,
      To,
      Body,
      MessageSid,
      ProfileName,
      MediaContentType0,
      MediaUrl0,
    } = req.body;

    console.log(From);

    await addUser(From, ProfileName, Body);
    await addMessage(From, To, Body, MessageSid, MediaContentType0, MediaUrl0);

    io.emit("live-message", {
      From,
      ProfileName,
      Body,
      MediaContentType0,
      MediaUrl0,
    });
  } catch (err) {
    next(err);
  }
});

app.use(twilioError);
app.use(serverError);

module.exports = server;
