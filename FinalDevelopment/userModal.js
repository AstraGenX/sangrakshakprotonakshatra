const mongoose = require("mongoose");

// Connect to MongoDB
try {
  mongoose.connect("mongodb://localhost:27017/sangrakshakuser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
