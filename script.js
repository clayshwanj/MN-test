// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const app = express();

function customMiddleware(req, res, next) {
  console.log("Middleware executed");

  next();
}

// require("dotenv").config();
configDotenv();
app.use(customMiddleware);
app.use(express.json());

// TODO: Learn about promises, callbacks, async await, then catch
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("Connect DB");
};

await connectDB();

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
