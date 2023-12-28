const express = require("express");
const router = express.Router();
const user = require("../database/database");

router.get("/data", (req, res) => {
  res.json({ message: "hi there" });
});

router.post("/post", async (req, res) => {
  const { name, gender, nationality, email, phone, address, message } =
    req.body;
  let currentuser = await user.find({ email });
  if (currentuser == null) {
    let newUser = new user({
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message,
    });
    await newUser.save();
    res.status(200).json({ message: "posted successfully" });
  } else {
    res.status(400).json({ message: "username already exists" });
  }
});

module.exports = router;
