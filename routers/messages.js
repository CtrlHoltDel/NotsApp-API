const { sendMessage, receiveMessage } = require("../controllers/messages");

const messagesRouter = require("express").Router();

messagesRouter.post("/send", sendMessage);
// messagesRouter.post("/receive", receiveMessage);

module.exports = messagesRouter;
