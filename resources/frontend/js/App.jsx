// resources/frontend/js/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './components/Courses';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path='/' element={<Courses />}/>
            </Routes>
        </Router>
    );
};

export default App;
