const express = require("express");
const router = express.Router();

const { User, Vehicle } = require("../models/index");

// require depedencies
const bodyParser = require("body-parser");
const getHashPassword = require("../helper/getHash");
const verifyToken = require("../auth/verifyToken");

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
router.post("/vehicle/new", async (req, res) => {
  console.log("inside backend");
  console.log(req.body);
});

router
  .route("/update")
  .all(verifyToken)
  .get(async (req, res, next) => {
    const dbUser = await User.findById(req.id);
    if (dbUser) {
      res.send(dbUser);
      return;
    }
    res.status(404).send("user not found");
  })
  .post(async (req, res, next) => {
    const userData = req.body;
    try {
      const updatedData = await User.findByIdAndUpdate(req.id, userData, {
        new: true,
        runValidators: true,
      });
      if (updatedData) res.status(200).send("data updated successfully");
      else res.status(500).status("update failed");
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
