import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
    const { courseId, videoId } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
            fetchCourseVideos();
        }
        if (videoId) {
            fetchSelectedVideo(videoId);
        }
    }, [courseId, videoId]);

    const fetchCourseDetails = async () => {
        try {
            const response = await axios.get(`http://test-course.test/api/courses/${courseId}`);
            setCourse(response.data);
        } catch (error) {
            console.error('There was an error fetching the course details!', error);
        }
    };

    const fetchCourseVideos = async () => {
        try {
            const response = await axios.get(`http://test-course.test/api/courses/${courseId}/videos`);
            setVideos(response.data);
        } catch (error) {
            console.error('There was an error fetching the course videos!', error);
        }
    };

    const fetchSelectedVideo = async (videoId) => {
        try {
            const response = await axios.get(`http://test-course.test/api/videos/${videoId}`);
            setSelectedVideo(response.data);
        } catch (error) {
            console.error('There was an error fetching the video!', error);
        }
    };

    const goToVideoPlayer = (videoId) => {
        navigate(`/course/${courseId}/video/${videoId}`);
    };

    const renderVideoPlayer = () => {
        if (selectedVideo) {
            if (selectedVideo.url) {
                return (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{selectedVideo.title}</h1>
                        <video src={selectedVideo.url} controls className="w-full h-64" />
                    </>
                );
            } else if (selectedVideo.file) {
                // بناء URL للملف إذا كان ملف
                const baseUrl = 'http://test-course.test/storage/videos/';
                const videoUrl = baseUrl + selectedVideo.file;
                
                return (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{selectedVideo.title}</h1>
                        <video src={videoUrl} controls className="w-full h-64" />
                    </>
                );
            }
        } else {
            return <p>Loading...</p>;
        }
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-1/4">
                {videos.map(video => (
                    <div 
                        key={video.id} 
                        className={`video bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer ${video.id === parseInt(videoId) ? 'bg-blue-100' : ''}`}
                        onClick={() => goToVideoPlayer(video.id)}
                    >
                        <h2 className="text-xl font-bold">{video.title}</h2>
                    </div>
                ))}
            </div>
            <div className="w-3/4 ml-4">
                {renderVideoPlayer()}
            </div>
        </div>
    );
};

export default VideoPlayer;
