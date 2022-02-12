const {
  sendMessage,
  getMessages,
  receiveMessage,
  receiveUpdate,
} = require("../controllers/messages");

const messagesRouter = require("express").Router();

messagesRouter.get("/", getMessages);
messagesRouter.post("/send", sendMessage);
messagesRouter.post("/twil-message", receiveMessage);
messagesRouter.post("/twil-update", receiveUpdate);

module.exports = messagesRouter;
