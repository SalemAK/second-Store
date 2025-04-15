// src/pages/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", imageUrl: "" });
    const [token, setToken] = useState(""); // Get this from localStorage later

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
        fetchProducts(storedToken);
    }, []);

    const fetchProducts = async (authToken) => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
            fetchProducts(token);
        } catch (err) {
            alert("Only admins can add products");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts(token);
        } catch (err) {
            alert("Delete failed or not authorized");
        }
    };

    return (
        <div>
            <h2>Admin: Manage Products</h2>

            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
                <input type="text" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                <button type="submit">Add Product</button>
            </form>

            <ul>
                {products.map((p) => (
                    <li key={p._id}>
                        <strong>{p.name}</strong> - ${p.price} - {p.stock} in stock
                        <button onClick={() => handleDelete(p._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProducts;
