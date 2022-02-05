const express = require("express");

require("dotenv").config({ path: `${__dirname}/.env.twilio` });

const app = express();
const server = require("http").createServer(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

const { twilioError } = require("./errors/errors");

const {
  postMessage,
  receiveMessage,
  getMessages,
} = require("./controllers/messages");
const { getContacts } = require("./controllers/contacts");
const client = require("./twilio/client");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

wss.on("connection", (ws) => {
  console.log(Object.keys(ws));
  console.log("a client connected");
});

app.get("/", (req, res) => {
  res.status(200).send("server up");
});

app.post("/send-message", postMessage);
app.post("/receive-message", receiveMessage);
app.get("/messages", getMessages);
app.get("/contacts", getContacts);
app.post("/cb-status", (req, res, next) => {
  const { body } = req;
});

app.get("/messages/del", async (req, res, next) => {
  const messages = await client.messages.list();

  messages.forEach((message) => {
    client.messages(message.sid).remove();
  });
});

app.use(twilioError);

module.exports = server;
