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

app.get("/", async (req, res, next) => {
  res.send("connected");
});

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.post("/messages/receive-message", async (req, res, next) => {
  try {
    const { From, To, Body, MessageSid, ProfileName } = req.body;

    const timeStamp = Date.now();
    await addUser(From, ProfileName, Body, timeStamp);
    await addMessage({
      from: From,
      to: To,
      body: Body,
      sid: MessageSid,
      timeStamp,
    });

    io.emit("live-message", {
      from: From,
      profile_name: ProfileName,
      body: Body,
      sid: MessageSid,
      timeStamp,
    });
  } catch (err) {
    next(err);
  }
});

app.use(twilioError);
app.use(serverError);

module.exports = server;
