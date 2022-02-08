const { sendMessage, getMessages } = require("../controllers/messages");

const messagesRouter = require("express").Router();

messagesRouter.get("/", getMessages);
messagesRouter.post("/send", sendMessage);
// messagesRouter.post("/receive", receiveMessage);

module.exports = messagesRouter;
