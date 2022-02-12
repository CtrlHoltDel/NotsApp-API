require("dotenv").config({ path: `${__dirname}/.env` });

const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const { urlencoded } = require("body-parser");

const db = require("./mongoDB/config");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const messagesRouter = require("./routers/messages");
const usersRouter = require("./routers/users");

const { twilioError, serverError } = require("./errors/errors");
const res = require("express/lib/response");

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res, next) => {
  res.send("Server Running");
});

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.use(twilioError);
app.use(serverError);

module.exports = server;
