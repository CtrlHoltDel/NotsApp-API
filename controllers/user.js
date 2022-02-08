const { User } = require("../models/schema");

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.send({ users });
};
