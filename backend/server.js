const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  }
});

const app = express();
app.use(express.json()); // For parsing application/json

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.get("/about", (req, res) => {
  res.send("About");
});

// Register endpoint
app.post("/register", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(sql, [name, email], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "Email already registered." });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
