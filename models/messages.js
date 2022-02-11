const { Message, User } = require("./schema");

exports.addMessage = async (message) => {
  const messageInstance = new Message(message);

  const { to, body, timeStamp, media_type } = message;

  await messageInstance.save();

  await User.updateOne(
    { number: to },
    { recent_message: !body ? media_type : body, timeStamp }
  );
};
