import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            const { token, user } = res.data;

            // Store token and user role
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);

            if (user.role !== "admin") {
                setError("Access denied. You are not an admin.");
                return;
            }

            // Redirect to admin dashboard or products
            navigate("/admin/products");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
