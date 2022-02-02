const client = require("../twilio/client");
const { TESTING_NUM } = process.env;

const MessagingResponse = require("twilio").twiml.MessagingResponse;

exports.testSend = async (req, res) => {
  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    body: `https://1702-88-97-43-131.ngrok.io/`,
    to: `whatsapp:${TESTING_NUM}`,
  });

  console.log(message.sid);

  res.send("hi");
};

exports.receiveMessage = async (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("This is an automated response");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};
