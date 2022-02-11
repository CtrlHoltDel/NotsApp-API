const { getUsers, postUser } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", postUser);

module.exports = usersRouter;
