const { User } = require("../models/schema");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ timeStamp: -1 });
    res.send({ users });
  } catch (err) {
    console.log(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const userInstance = new User({ ...req.body, timeStamp: Date.now() });

    await userInstance.save();

    res.send(userInstance);
  } catch (err) {
    res.send(201);
  }
};
