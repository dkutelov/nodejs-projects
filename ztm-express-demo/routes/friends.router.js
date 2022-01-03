const { Router } = require("express");
const friendsController = require("../controllers/friends.controller");

const friendsRouter = Router();

friendsRouter.get("/", friendsController.getFriends);
friendsRouter.post("/", friendsController.postFriend);
friendsRouter.get("/:friendId", friendsController.getFriend);

module.exports = friendsRouter;
