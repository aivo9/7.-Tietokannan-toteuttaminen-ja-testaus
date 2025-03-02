const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Tietokantavirhe:", err);
  } else {
    console.log("Tietokanta yhdistetty.");
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL
      )`
    );
  }
});

app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/items", (req, res) => {
  const { name, description, quantity } = req.body;
  db.run(
    "INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)",
    [name, description, quantity],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Serveri käynnissä osoitteessa http://localhost:${PORT}`);
});