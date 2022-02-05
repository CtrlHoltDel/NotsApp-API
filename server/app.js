const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: `${__dirname}/.env.twilio` });

const app = express();
const server = require("http").createServer(app);

const bodyParser = require("body-parser");
const { twilioError } = require("./errors/errors");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

const { postMessage } = require("./controllers/messages");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

console.log(app);
app.get("/", (req, res) => res.send("test"));
app.post("/send-message", postMessage);

app.use(twilioError);

module.exports = server;
