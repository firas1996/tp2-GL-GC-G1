const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (name, id) => {
  return jwt.sign({ name, id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "email and password are required !!!!",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.verifPass(password, user.password)) {
      return res.status(400).json({
        status: "fail",
        message: "email or password are incorrect !!!!",
      });
    }
    const token = createToken(user.name, user._id);
    res.status(200).json({
      status: "success",
      message: "logged in",
      token,
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
