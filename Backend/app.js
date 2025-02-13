const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;

// requring modals
const User = require("./models/user");
const Plan = require("./models/plan");
const Mechanic = require("./models/mechanic");
const Vehicle = require("./models/vehicle");

// connecting to mongoose server
main()
.then(()=>console.log("db connection established"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MechCare');
}

app.get("/", (req, res) => {
  res.send("root here");
});

app.listen(port, () => {
  console.log(`Server Listen on Port ${port}`);
});

