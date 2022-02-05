const client = require("../twilio/client");
const { TWILIO_NUM } = process.env;

exports.sendMessage = async ({ message, number }) => {
  const data = await client.messages.create({
    from: `whatsapp:${TWILIO_NUM}`,
    body: message,
    to: `whatsapp:${number}`,
    statusCallback: "https://0645-88-97-43-131.ngrok.io/cb-status",
  });

  return data;
};

exports.fetchMessages = async () => {
  const result = await client.messages.list({ limit: 20 });

  console.log(result);

  return result;
};
