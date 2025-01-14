const { default: mongoose } = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("DB Err: ", err);
    });
};

module.exports = connectDB;
