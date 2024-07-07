import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourseDetails();
        fetchCourseVideos();
    }, []);

    const fetchCourseDetails = () => {
        axios.get(`http://test-course.test/api/courses/${courseId}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the course details!', error);
            });
    };

    const fetchCourseVideos = () => {
        axios.get(`http://test-course.test/api/courses/${courseId}/videos`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the course videos!', error);
            });
    };

    const startCourse = () => {
        if (videos.length > 0) {
            navigate(`/course/${courseId}/video/${videos[0].id}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {course && (
                <>
                    <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <button 
                        onClick={startCourse}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        ابدأ
                    </button>
                </>
            )}
        </div>
    );
};

export default CourseDetails;
