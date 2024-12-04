const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, age } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
      age,
    });
    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
