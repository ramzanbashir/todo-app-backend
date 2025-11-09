import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get All
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add
router.post("/", async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({ text, completed: false });
  res.json(todo);
});

// Update (Fix: allow editing text & completed both)
router.put("/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;

    const updates = {};
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
