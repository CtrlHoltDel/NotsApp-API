const { TWILIO_AUTH_TOKEN, TWILIO_SID } = process.env;

if (!TWILIO_AUTH_TOKEN || !TWILIO_SID) {
  throw new Error("Missing authorisation token or SID");
}

const client = require("twilio")(TWILIO_SID, TWILIO_AUTH_TOKEN);

module.exports = client;
