import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/course/:courseId" element={<CourseDetails />} />
                <Route path="/course/:courseId/video/:videoId" element={<VideoPlayer />} />
            </Routes>
        </Router>
    );
};

export default App;
