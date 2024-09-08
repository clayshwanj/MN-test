const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

//Schema
const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  {
    collection: "people",
  }
);

const UserModel = mongoose.model("people", UserSchema);

// Middleware to create a new document
const createNewUser = async (req, res, next) => {
  const { name, age } = req.body;

  // try {
  //   const newUser = new UserModel({ name, age });
  //   req.newUser = await newUser.save();
  //   next();
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send("Internal Server Error");
  // }
};

//Route
app.get("/people", async (req, res) => {
  // UserModel.find()
  //   .then(function (people) {
  //     res.status(200).json(people);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send("Internal Server Error");
  //   });

  try {
    const people = await UserModel.find();
    res.json(people);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// POST route to add a new document to the database
app.post("/people", async (req, res) => {
  const { name, age } = req.body;

  try {
    const newUser = new UserModel({ name, age });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//port
app.listen(3001, () => {
  console.log("Server is Running on Port 3001");
});
