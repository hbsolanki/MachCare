const express = require("express");
const router = express.Router();

const { User, Vehicle } = require("../models/index");

// require depedencies
const bodyParser = require("body-parser");
const getHashPassword = require("../helper/getHash");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());


// route to add new user to db
router.post("/new", async (req, res) => {
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


// route to add new vehicle to user data and save to db
router.post("/vehicle/new",async (req, res) => {
  console.log("inside backend");
  console.log(req.body);
})

router.route("/update/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await User.findById(id);
  } catch (error) {}
});

module.exports = router;
