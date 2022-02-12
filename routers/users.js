const { getUsers, postUser, delUser } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser).delete(delUser);

module.exports = usersRouter;
