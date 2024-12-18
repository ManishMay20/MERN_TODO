import express from "express";
import authenticate from "../middleware/authenticate.js";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.user.id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching todos ", error });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.find({ _id: id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params();
  const { title, description, isCompleted } = req.body;

  try {
    const todo = Todo.findOneAndUpdate(
      { _id: id },
      { title, description, isCompleted },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, description } = req.body;
  console.log(req.user.id);
  try {
    const todo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not created" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating todo", error });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the todo by ID
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting todo", error });
  }
});

export default router;
