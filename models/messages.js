const { Message, User } = require("./schema");

exports.addMessage = async (message) => {
  const messageInstance = new Message(message);

  const { to, body, timeStamp } = message;

  await messageInstance.save();

  //If there's no body - preview media type instead.

  await User.updateOne(
    { number: to },
    { recent_message: !body ? media_type : body, timeStamp }
  );
};
