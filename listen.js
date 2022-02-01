const app = require("./app");

require("dotenv").config({ path: `${__dirname}/.env.twilio` });

const { TWILIO_AUTH_TOKEN, TWILIO_SID } = process.env;

if (!TWILIO_AUTH_TOKEN || !TWILIO_SID) {
  console.log("Missing authorisation token or SID");
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
