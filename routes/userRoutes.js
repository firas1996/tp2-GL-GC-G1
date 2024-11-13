const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").post(userController.createUser);
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserById);
router.route("/:id").patch(userController.updateUser);

module.exports = router;
