const { User } = require("./schema");

exports.addUser = async (number, profile_name, recent_message, timeStamp) => {
  if (await User.findOne({ number })) {
    await User.updateOne({ number }, { recent_message, timeStamp });
  } else {
    const userInstance = new User({
      profile_name,
      number,
      recent_message,
      timeStamp,
    });

    await userInstance.save();
  }
};
