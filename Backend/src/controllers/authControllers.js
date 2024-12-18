import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import authenticate from "../middleware/authenticate.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const Authenticate = async (req, res) => {
  try {
    authenticate();
    res.json({ isAuth: true });
  } catch (e) {
    res.status(404).json({ isAuth: false });
  }
};

export const Signin = async (req, res) => {
  console.log("i am in sigin function ");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invaild credentials" });
    }

    console.log("password matched");
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    console.log("token generated");

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error in signin", error }); // Handle validation errors
  }
};

export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user already resistred please sigin" });
    }

    console.log({ name, email, password });
    const user = new User({ name, email, password }); // Create a new User instance

    await user.save(); // Save to the database
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
