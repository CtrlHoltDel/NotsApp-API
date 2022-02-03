const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: `${__dirname}/.env.twilio` });

const app = express();
const bodyParser = require("body-parser");
const messagesRouter = require("./router/messages");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/", messagesRouter);

module.exports = app;
