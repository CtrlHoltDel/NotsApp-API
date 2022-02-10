const { sendMessage, getMessages } = require("../controllers/messages");

const messagesRouter = require("express").Router();

messagesRouter.get("/", getMessages);
messagesRouter.post("/send", sendMessage);

module.exports = messagesRouter;
