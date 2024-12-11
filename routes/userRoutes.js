const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const {
  signup,
  login,
  protectionMW,
} = require("../controllers/authController");
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").post(protectionMW, createUser).get(protectionMW, getAllUsers);
router
  .route("/:id")
  .get(protectionMW, getUserById)
  .patch(protectionMW, updateUser)
  .delete(protectionMW, deleteUser);

module.exports = router;
