import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminProducts = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, token } = useAuth();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        Code: "",
        name: "",
        shortDescription: "",
        fullDescription: "",
        categoryCode: "",
        image: [],
        variation: [
            {
                image: "",
                size: [
                    {
                        name: "",
                        stock: 0,
                        price: 0,
                        code: "",
                        discount: 0,
                        offerStart: "",
                        offerEnd: "",
                    },
                ],
            },
        ],
    });
    useEffect(() => {
        if (!isLoggedIn || !isAdmin) {
            navigate("/admin-login-page");
        } else {
            fetchProducts();
            fetchCategories();
        }
    }, [isLoggedIn, isAdmin]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        if (!isLoggedIn || !isAdmin) {
            navigate("/admin-login-page");
        } else {
            fetchProducts();
        }
    }, [isLoggedIn, isAdmin]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
            setError("Failed to fetch products");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:5000/api/products", form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForm({
                Code: "",
                name: "",
                shortDescription: "",
                fullDescription: "",
                categoryCode: "",
                image: [],
                variation: [
                    {
                        image: "",
                        size: [
                            {
                                name: "",
                                stock: 0,
                                price: 0,
                                code: "",
                                discount: 0,
                                offerStart: "",
                                offerEnd: "",
                            },
                        ],
                    },
                ],
            });
            fetchProducts();
        } catch (err) {
            console.error(err);
            setError("Only admins can add products or something went wrong.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts();
        } catch (err) {
            setError("Delete failed or not authorized.");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Admin Panel - Products</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleCreate} style={{ marginBottom: "2rem" }}>
                <input type="text" placeholder="Product Code" value={form.Code} onChange={(e) => setForm({ ...form, Code: e.target.value })} />
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <textarea placeholder="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
                <textarea placeholder="Full Description" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
                <select value={form.categoryCode} onChange={(e) => setForm({ ...form, categoryCode: e.target.value })} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.categoryCode}>
                            {cat.name} ({cat.categoryCode})
                        </option>
                    ))}
                </select>

                {/* Simplified single image entry for now */}
                <input type="text" placeholder="Main Image URL" value={form.image[0] || ""} onChange={(e) => setForm({ ...form, image: [e.target.value] })} />

                {/* First variation fields */}
                <h4>Variation</h4>
                <input
                    type="text"
                    placeholder="Size Name"
                    value={form.variation[0].size[0].name}
                    onChange={(e) => {
                        const variation = [...form.variation];
                        variation[0].size[0].name = e.target.value;
                        setForm({ ...form, variation });
                    }}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={form.variation[0].size[0].stock}
                    onChange={(e) => {
                        const variation = [...form.variation];
                        variation[0].size[0].stock = parseInt(e.target.value);
                        setForm({ ...form, variation });
                    }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.variation[0].size[0].price}
                    onChange={(e) => {
                        const variation = [...form.variation];
                        variation[0].size[0].price = parseFloat(e.target.value);
                        setForm({ ...form, variation });
                    }}
                />

                <button type="submit">Add Product</button>
            </form>

            <ul>
                {products.map((p) => (
                    <li key={p._id} style={{ marginBottom: "1rem" }}>
                        <strong>{p.name}</strong> - Code: {p.Code}
                        <br />
                        <small>{p.shortDescription}</small>
                        <br />
                        <button onClick={() => handleDelete(p._id)} style={{ marginTop: "0.5rem" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProducts;
