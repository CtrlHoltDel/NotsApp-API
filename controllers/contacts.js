const { fetchContacts } = require("../models/contacts");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    res.status(200).send({ contacts });
  } catch (err) {
    next(err);
  }
};
