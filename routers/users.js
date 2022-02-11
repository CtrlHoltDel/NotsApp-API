const { getUsers, postUser, delUser } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", postUser);
usersRouter.delete("/", delUser);

module.exports = usersRouter;
