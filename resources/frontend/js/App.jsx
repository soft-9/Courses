import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import VideoPlayer from "./components/VideoPlayer";
import Header from "./components/Header";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://test-course.test/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    localStorage.removeItem("authToken");
                    setToken(null);
                    setUser(null);
                }
            }
        };

        fetchUser();
    }, [token]);

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
    };

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
    };

    return (
        <Router>
            <Header token={token} setToken={handleSetToken} handleLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login setToken={handleSetToken} />} />
                <Route path="/register" element={<Register setToken={handleSetToken} />} />
                <Route path="/" element={<Courses />} />
                <Route path="/course/:courseId" element={<CourseDetails />} />
                <Route path="/course/:courseId/video/:videoId" element={<VideoPlayer currentUser={user} token={token} />} />
                <Route
                    path="/"
                    element={
                        token ? <Courses user={user} /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
