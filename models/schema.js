const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  profile_name: { type: String, required: true },
  number: { type: String, required: true },
  recent_message: { type: String },
  timeStamp: { type: Date },
});

const MessageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  body: { type: String },
  sid: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  message_status: { type: String },
  media_type: { type: String },
  media_url: { type: String },
});

exports.User = mongoose.model("user", UserSchema);
exports.Message = mongoose.model("messages", MessageSchema);
