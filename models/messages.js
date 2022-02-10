const { Message, User } = require("./schema");

exports.addMessage = async (message) => {
  const { from, to, body, sid, timeStamp, message_status } = message;

  const messageInstance = new Message({
    from,
    to,
    body,
    sid,
    timeStamp,
    message_status,
  });

  await messageInstance.save();
  await User.updateOne({ number: to }, { recent_message: body, timeStamp });
};
