const { addMessage } = require("../models/messages");
const { addUser } = require("../models/user");
const client = require("../twilio/config");

exports.sendMessage = async (req, res, next) => {
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
    next(err);
  }
};

// exports.receiveMessage = async (req, res, next) => {
//   try {
//     const {
//       From,
//       To,
//       Body,
//       MessageSid,
//       ProfileName,
//       MediaContentType0,
//       MediaUrl0,
//     } = req.body;

//     await addUser(From, ProfileName);
//     await addMessage(From, To, Body, MessageSid, MediaContentType0, MediaUrl0);

//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// };
