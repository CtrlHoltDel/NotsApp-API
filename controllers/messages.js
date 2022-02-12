const {
  addMessage,
  fetchMessages,
  receiveMessageHook,
  receiveUpdateHook,
} = require("../models/messages");

exports.sendMessage = async (req, res, next) => {
  try {
    const data = await addMessage(req.body);
    res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await fetchMessages(req.query);
    res.send({ messages });
  } catch (err) {
    next(err);
  }
};

exports.receiveMessage = async (req, res, next) => {
  try {
    await receiveMessageHook(req.body, req.io);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.receiveUpdate = async (req, res, next) => {
  try {
    await receiveUpdateHook(req.body, req.io);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
