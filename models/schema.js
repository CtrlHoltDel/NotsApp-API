const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  profile_name: { type: String, required: true },
  number: { type: String, required: true },
  recent_message: { type: String },
});

const MessageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  type: { type: String, required: true },
  body: { type: String },
  sid: { type: String, required: true },
  media: { type: String },
  timeStamp: { type: Date },
});

exports.User = mongoose.model("user", UserSchema);
exports.Message = mongoose.model("messages", MessageSchema);
