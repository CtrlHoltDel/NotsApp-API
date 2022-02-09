const { Message } = require("./schema");

exports.addMessage = async (message) => {
  const { from, to, body, sid, timeStamp } = message;

  const messageInstance = new Message({ from, to, body, sid, timeStamp });

  await messageInstance.save();
};
