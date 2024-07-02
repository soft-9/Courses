import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://test-course.test/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);

    return (
        <div className="container">
            {courses.map(course => (
                <div key={course.id} className="course">
                    <h2>{course.title}</h2>
                    <img src={`/storage/${course.image}`} alt={course.title} />
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Courses;
