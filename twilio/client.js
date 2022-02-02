const { TWILIO_AUTH_TOKEN, TWILIO_SID } = process.env;

if (!TWILIO_AUTH_TOKEN || !TWILIO_SID) {
  console.log("Missing authorisation token or SID");
}

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

module.exports = client;
