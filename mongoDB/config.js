const { MONGO_PW, MG_DB } = process.env;

const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://notsApp:${MONGO_PW}@cluster0.r7clh.mongodb.net/${MG_DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = db;
