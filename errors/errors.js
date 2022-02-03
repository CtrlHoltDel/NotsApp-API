exports.twilioError = (err, req, res, next) => {
  console.log(err.code);
  if (err.code === 21211) {
    res.status(400).send("invalid phone number");
  }

  next();
};

exports.serverError = (err, req, res) => {
  console.log(err, "<< Uncaught err");
  res.status(500);
};
