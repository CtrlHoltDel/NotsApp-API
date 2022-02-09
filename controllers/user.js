const { User } = require("../models/schema");

exports.getUsers = async (req, res, next) => {
  const users = await User.find().sort({ timeStamp: -1 });
  res.send({ users });
};
