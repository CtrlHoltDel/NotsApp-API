const { Message, User } = require("./schema");
const { addUser } = require("./user");
const client = require("../twilio/config");

const saveMessage = async (message) => {
  const messageInstance = new Message(message);

  await messageInstance.save();

  const { to, body, timeStamp, media_type } = message;

  await User.updateOne(
    { number: to },
    { recent_message: !body ? media_type : body, timeStamp }
  );
};

exports.addMessage = async ({ message, number }) => {
  const data = await client.messages.create({
    body: message,
    to: number,
    from: "whatsapp:+14155238886",
  });

  const timeStamp = Date.now();
  const { body, media_type } = data;

  await saveMessage({
    ...data,
    timeStamp,
    message_status: "sending",
  });

  return { data, timeStamp, message_status: "sending" };
};

exports.fetchMessages = async ({ number }) => {
  const messages = await Message.find({
    $or: [{ from: `whatsapp:+${number}` }, { to: `whatsapp:+${number}` }],
  })
    .sort({ timeStamp: -1 })
    .limit(40);

  return messages;
};

exports.receiveMessageHook = async (receivedMessage, io) => {
  const {
    From: from,
    To: to,
    Body: body,
    MessageSid: sid,
    ProfileName: profile_name,
    MediaContentType0: media_type,
    MediaUrl0: media_url,
  } = receivedMessage;

  const timeStamp = Date.now();

  const updateObject = {
    from,
    to,
    body,
    sid,
    timeStamp,
    profile_name,
    media_type,
    media_url,
    timeStamp,
  };

  await addUser(from, profile_name, body, timeStamp);
  await saveMessage(updateObject);
  io.emit("live-message", updateObject);
};

exports.receiveUpdateHook = async (receivedUpdate, io) => {
  const {
    MessageSid: sid,
    To: to,
    MessageStatus: message_status,
  } = receivedUpdate;

  await Message.updateOne({ sid }, { message_status });

  io.emit("message-update", {
    sid,
    to,
    message_status,
  });
};
