import React, { useState } from "react";
import api from "../../helpers/api"; // Ensure api is set up correctly
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "male",
        profile_photo: null,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profile_photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await api.post("/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            setToken(token); 
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            } else {
                console.error("There was an error registering!", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input-field"
                required
            />
            {errors.name && (
                <span className="error-text">{errors.name[0]}</span>
            )}
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
                required
            />
            {errors.email && (
                <span className="error-text">{errors.email[0]}</span>
            )}
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input-field"
                required
            />
            {errors.password && (
                <span className="error-text">{errors.password[0]}</span>
            )}
            <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input-field"
                required
            />
            {errors.password_confirmation && (
                <span className="error-text">
                    {errors.password_confirmation[0]}
                </span>
            )}
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
                required
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            {errors.gender && (
                <span className="error-text">{errors.gender[0]}</span>
            )}
            <input
                type="file"
                name="profile_photo"
                onChange={handleFileChange}
                className="input-field"
            />
            {errors.profile_photo && (
                <span className="error-text">{errors.profile_photo[0]}</span>
            )}
            <button type="submit" className="btn-primary">
                Register
            </button>
        </form>
    );
};

export default Register;
