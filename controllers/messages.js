const client = require("../twilio/client");
const { TWILIO_NUM } = process.env;

exports.sendMessage = async ({ body }, res, next) => {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${TWILIO_NUM}`,
      body: body.message,
      to: `whatsapp:${body.number}`,
    });
    res.send(message);
  } catch (err) {
    next(err);
  }
};

const MessagingResponse = require("twilio").twiml.MessagingResponse;

exports.receiveMessage = async (req, res) => {
  console.log("message received");
  const twiml = new MessagingResponse();

  twiml.message("Automated response test");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Automated response test with xml</Message></Response>`
  );
};

exports.receiveCallback = async (req, res) => {
  console.log(req.body);
};
