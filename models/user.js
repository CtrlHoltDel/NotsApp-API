const { User } = require("./schema");

exports.addUser = async (number, profile_name, recent_message, timeStamp) => {
  const userCheck = await User.findOne({ number });

  if (userCheck) {
    //If there's no media, preview media type instead.
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
