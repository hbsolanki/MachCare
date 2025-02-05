const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.route("/new").post((req, res) => {
  console.log(req.body);
});

module.exports = router;
