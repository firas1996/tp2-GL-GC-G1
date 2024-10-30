const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port: ${port}...`);
});

// Connect TO THe DATABASE

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((connection) => {
    console.log("DB connected succesfuly...");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/msg", (req, res) => {
//   res.send("This msg from the server");
// });

const specs = JSON.parse(fs.readFileSync("./spec.json", "utf-8"));

app.get("/specs", (req, res) => {
  res.status(200).json({
    status: "success",
    result: specs.length,
    data: {
      specs,
    },
  });
});

app.post("/specs", (req, res) => {
  const id = specs[specs.length - 1].id + 1;
  const newSpac = Object.assign({ id: id }, req.body);
  specs.push(newSpac);
  fs.writeFile("./spec.json", JSON.stringify(specs), (err) => {
    res.status(201).json({
      status: "success",
      newSpac,
    });
  });
});
