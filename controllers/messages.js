const { addMessage } = require("../models/messages");
const { Message } = require("../models/schema");
const client = require("../twilio/config");

exports.sendMessage = async (req, res, next) => {
  console.log(req.body);

  try {
    const { message, number } = req.body;

    const data = await client.messages.create({
      body: message,
      to: `whatsapp:${number}`,
      from: "whatsapp:+14155238886",
    });

    const { from, to, body, sid } = data;

    await addMessage(from, to, body, sid);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
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
      .limit(20);

    res.send({ messages });
  } catch (err) {
    console.log(err);
  }
};
