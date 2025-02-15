const express = require("express");
const app = express();
const port = 8080;

// requiring necessary dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const getHashPassword = require("./helper/getHash");

// connecting to mongoose server
main()
  .then(() => console.log("db connection established"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MechCare");
}

// using cors to avoid CORS ERROR
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// requring modals
const { User, Dealer, Vehicle, Plan, Mechanic } = require("./models/index");

app.listen(port, () => {
  console.log(`Server Listen on Port ${port}`);
});

// routes
app.get("/", (req, res) => {
  res.send("root here");
});


app.post("/user/new", async (req, res) => {
  const userData = req.body;
  userData.password = await getHashPassword(userData.password);
  try {
    const user = new User(userData);
    const data = await user.save();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
