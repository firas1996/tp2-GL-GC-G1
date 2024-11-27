const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
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

exports.getAllUsers = async (req, res) => {
  try {
    const removeThis = ["page", "limit", "sort"];
    let querry = { ...req.query };
    removeThis.forEach((el) => delete querry[el]);
    // Filtering :
    console.log(querry);
    let str = JSON.stringify(querry);
    str = str.replace(/\b(lt|lte|gt|gte)\b/g, (opt) => `$${opt}`);
    console.log(str);
    let myRequest = User.find(JSON.parse(str));

    // 2) Pagination :
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    if (req.query.page) {
      const nbr = await User.countDocuments();
      if (skip >= nbr) {
        res.status(400).json({
          message: "you have passed the limit",
        });
        // console.log("aaa");
        // throw new Error("sdfsdfsdffd");
      }
    }
    myRequest = myRequest.skip(skip).limit(limit);

    // 3) Sorting :

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      myRequest = myRequest.sort(sortBy);
    } else {
      myRequest = myRequest.sort("-created_at");
    }

    // const users = await User.find().where("name").equals(req.query.name);

    const users = await myRequest;
    res.status(200).json({
      status: "success",
      result: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Update User

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).json({
      status: "success",
      data: { updatedUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete User

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(203).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
