import React, { useState } from "react";
import api from "../../helpers/api";
import { useNavigate } from "react-router-dom"; 

const Login = ({ setToken }) => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", {
                email,
                password,
            });
            
            localStorage.setItem("authToken", response.data.token);
            setToken(response.data.token); 
            navigate("/"); 
        } catch (error) {
            console.error(error);
            setError(
                error.response
                    ? error.response.data.message
                    : "An error occurred"
            );
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
