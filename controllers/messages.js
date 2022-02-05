const { sendMessage, fetchMessages } = require("../models/messages");

exports.postMessage = async (req, res, next) => {
  try {
    const message = await sendMessage(req.body);
    res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await fetchMessages();
    res.status(200).send({ messages });
  } catch (err) {
    next(err);
  }
};

exports.receiveMessage = async (req, res, next) => {
  console.log(req.body, "<<");
};
