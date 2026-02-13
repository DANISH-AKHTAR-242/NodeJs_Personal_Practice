const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  if (!token) {
    return res.status(500).json({ error: "Failed to generate token" });
  }
  res.status(200).json({ email: user.email, name: user.name, token });
}


async function register(req, res) {
  const { name, email, password, age, phone } = req.body;

  //create user in database
  const user = User({
    name,
    email,
    password: await encryptPassword(password),
    age,
    phone,
  });

  //talking to DB and create user
  try {
    const response = await user.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}

async function encryptPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = { login, register };
