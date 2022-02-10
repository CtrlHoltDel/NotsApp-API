const { addMessage } = require("../models/messages");
const { Message } = require("../models/schema");
const client = require("../twilio/config");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, number } = req.body;

    const data = await client.messages.create({
      body: message,
      to: number,
      from: "whatsapp:+14155238886",
    });

    const timeStamp = Date.now();
    await addMessage({ ...data, timeStamp, message_status: "sending" });

    res.status(201).send({ data, timeStamp, message_status: "sending" });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const { number } = req.query;

  try {
    const messages = await Message.find({
      $or: [{ from: `whatsapp:+${number}` }, { to: `whatsapp:+${number}` }],
    })
      .sort({ timeStamp: -1 })
      .limit(40);

    res.send({ messages });
  } catch (err) {
    next(err);
  }
};
