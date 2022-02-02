const express = require("express");
require("dotenv").config({ path: `${__dirname}/.env.twilio` });

const { testSend, receiveMessage } = require("./controllers/messages");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("test");
});

app.post("/", receiveMessage);

app.get("/testS", testSend);

module.exports = app;
