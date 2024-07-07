import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ token, setToken, handleLogout }) => {
    const [username, setUsername] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://test-course.test/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsername(response.data.name);
                    setShowWelcome(true);
                    setTimeout(() => {
                        setShowWelcome(false);
                    }, 6000);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setError('Failed to fetch user data');
                }
            }
        };

        fetchUser();
    }, [token]);

    const handleLogoutClick = () => {
        handleLogout();
        setUsername('');
        setShowWelcome(false);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                <div>
                    <Link to="/" className="text-xl font-bold">الصفحة الرئيسية</Link>
                </div>
                <div>
                    {token ? (
                        <>
                            {showWelcome && <span className="mr-4">مرحباً {username}</span>}
                            <button
                                onClick={handleLogoutClick}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                تسجيل الخروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4 text-white hover:text-gray-300">تسجيل الدخول</Link>
                            <Link to="/register" className="text-white hover:text-gray-300">تسجيل</Link>
                        </>
                    )}
                </div>
            </nav>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </header>
    );
};

export default Header;
