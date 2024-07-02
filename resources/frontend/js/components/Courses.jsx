import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import male from '../img/Gender/male.png';
import female from '../img/Gender/female.png';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        setCurrentPage(page);
        fetchCourses(page);
    }, [location]);

    const fetchCourses = (page) => {
        axios.get(`http://test-course.test/api/courses?page=${page}`)
            .then(response => {
                const coursesData = response.data.data;
                setCourses(coursesData);
                setTotalPages(response.data.last_page);
                loadUserNames(coursesData);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    };

    const fetchUserName = async (userId) => {
        try {
            const response = await axios.get(`http://test-course.test/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const loadUserNames = async (coursesData) => {
        const updatedCourses = await Promise.all(
            coursesData.map(async course => {
                const user = await fetchUserName(course.user_id);
                return { ...course, user };
            })
        );
        setCourses(updatedCourses);
    };

    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
    };

    const getProfilePhoto = (user) => {
        if (user && user.profile_photo) {
            return `/storage/user_photos/${user.profile_photo}`;
        } else {
            return user && user.gender === 'male' ? male : female;
        }
    };

    const goToCourseDetails = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="container mx-auto p-4">
            {courses.map(course => (
                <div key={course.id} className="course bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                    <img src={`/storage/course_images/${course.image}`} alt={course.title} className="w-full h-64 object-cover mb-4 rounded" />
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    {course.user && (
                        <>
                            <p className="text-gray-900 font-semibold">Created by: {course.user.name}</p>
                            <img
                                src={getProfilePhoto(course.user)}
                                alt={course.user.name}
                                className="w-12 h-12 object-cover rounded-full"
                            />
                        </>
                    )}
                    <button
                        onClick={() => goToCourseDetails(course.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        View Course Details
                    </button>
                </div>
            ))}
            {totalPages > 1 && (
                <div className="pagination flex justify-center mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-1 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 mx-1 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Courses;
