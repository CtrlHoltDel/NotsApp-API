const { User } = require("../models/schema");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ timeStamp: -1 });
    res.send({ users });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const userInstance = new User({ ...req.body, timeStamp: Date.now() });

    await userInstance.save();

    res.status(201).send(userInstance);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delUser = async (req, res, next) => {
  try {
    await User.deleteOne({ number: req.body.number });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
