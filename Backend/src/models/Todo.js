import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // The title of the task is mandatory
    trim: true, // Removes leading and trailing spaces
  },
  description: {
    type: String,
    default: "", // Optional field for more details about the task
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Tracks if the task is completed
  },
  dueDate: {
    type: Date, // Optional deadline for the task
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who owns the task
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Tracks the last time the task was updated
  },
});

// Middleware to update `updatedAt` before saving
todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
