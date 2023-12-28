const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  message: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

mongoose
  .connect(
    "mongodb+srv://nikhilsingh911:Rb9ejKmGhgJligRu@cluster0.vpkwayf.mongodb.net/",
    { dbName: "survey" }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/data", async (req, res) => {
  let data = await user.find({});
  res.status(200).json(data);
});

// API endpoint to create a new user
app.post("/createUser", async (req, res) => {
  const { name, gender, nationality, email, phone, address, message } =
    req.body;

  try {
    // Check if the email already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user entry
    const newUser = new user({
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4000, () => {
  console.log("server is working");
});
