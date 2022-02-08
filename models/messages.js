const { Message } = require("./schema");

exports.addMessage = async (from, to, body, sid, type = "text") => {
  const messageInstance = new Message({
    from,
    to,
    type,
    body,
    sid,
    timeStamp: Date.now(),
  });

  await messageInstance.save();
};
