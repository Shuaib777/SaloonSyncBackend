const express = require("express");

const usersController = require("../controller/usersController.js");

const router = express.Router();

router
  .get("/", usersController.readUsers)
  .get("/:userId", usersController.readUser)
  .post("/", usersController.createUser)
  .put("/:userId", usersController.updateUser)
  .delete("/:userId", usersController.deleteUser);

exports.usersRouter = router;
