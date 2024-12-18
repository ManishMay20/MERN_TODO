import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // String type, required field
  email: { type: String, required: true, unique: true }, // Unique email
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 8; // Minimum length validation
      },
      message: "Password must be at least 8 characters long",
    },
  },

  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password not modified
  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt generated", salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("password hashed");
    next();
  } catch (e) {
    console.log("error in pre save middleware ", e);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("i am in comaprepassword method");
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
