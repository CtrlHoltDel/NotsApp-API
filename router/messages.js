const messagesRouter = require("express").Router();
const {
  sendMessage,
  receiveMessage,
  receiveCallback,
} = require("../controllers/messages");

messagesRouter.get("/", (req, res) => res.status(200).send("Connected"));

messagesRouter.post("/send-message", sendMessage);
messagesRouter.post("/receive-message", receiveMessage);
messagesRouter.post("/receive-callback", receiveCallback);

module.exports = messagesRouter;
