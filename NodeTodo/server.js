const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.post("/tod", (req, res) => {
  const { task, status } = req.body;

  if (!task || !status) {
    return res.status(400).json({ error: "Please provide both task and status" });
  }

  const newTodo = { id: todos.length + 1, task, status };
  todos.push(newTodo);

  res.status(201).json({
    message: "Todo added successfully",
    todos,
  });
});

app.get("/tod", (req, res) => {
  res.json(todos);
});

// Simple DELETE route method
app.delete("/tod/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: "🗑️ Todo deleted successfully", todos });
});

app.listen(3000, () => {
  console.log("🚀 Server started");
});


