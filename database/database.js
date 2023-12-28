const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: Number, required: true },
  message: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
