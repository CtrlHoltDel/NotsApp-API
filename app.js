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
const client = require("./twilio/config");
const { Message } = require("./models/schema");

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
    const {
      From: from,
      To: to,
      Body: body,
      MessageSid: sid,
      ProfileName: profile_name,
      MediaContentType0: media_type,
      MediaUrl0: media_url,
    } = req.body;

    const timeStamp = Date.now();
    await addUser(from, profile_name, body, timeStamp);
    await addMessage({
      from,
      to,
      body,
      sid,
      timeStamp,
      media_type,
      media_url,
    });

    console.log("message received");

    io.emit("live-message", {
      from,
      profile_name,
      body,
      sid,
      timeStamp,
      media_type,
      media_url,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/messages/receive-update", async (req, res, next) => {
  console.log("update received");

  try {
    const { MessageSid: sid, To: to, MessageStatus: message_status } = req.body;

    await Message.updateOne({ sid }, { message_status });

    io.emit("message-update", {
      sid,
      to,
      message_status,
    });
  } catch (err) {
    next(err);
  }
});

app.use(twilioError);
app.use(serverError);

module.exports = server;
