const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { signup } = require("../controllers/authController");
router.route("/signup").post(signup);
router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
