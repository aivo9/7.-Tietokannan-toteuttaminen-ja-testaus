import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/items";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: 1 });

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Virhe haettaessa tietoja:", error);
    }
  };

  const addItem = async () => {
    if (!newItem.name.trim()) return;
    try {
      await axios.post(API_URL, newItem);
      setNewItem({ name: "", description: "", quantity: 1 });
      fetchItems();
    } catch (error) {
      console.error("Virhe lisättäessä tietoa:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Virhe poistaessa tietoa:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">SQLite CRUD -sovellus</h1>

      <div className="card p-3 mb-4">
        <h3>Lisää uusi tietue</h3>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nimi"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Kuvaus"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Määrä"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
          />
        </div>
        <button className="btn btn-primary" onClick={addItem}>
          Lisää
        </button>
      </div>

      <h3>Tietokannan tiedot</h3>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} ({item.quantity}) - {item.description}
            <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;