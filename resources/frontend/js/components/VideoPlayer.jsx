import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment';

const VideoPlayer = ({ currentUser }) => {
    const { courseId, videoId } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ comment: '', name: '', gender: 'male' });
    const navigate = useNavigate();

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
            fetchCourseVideos();
        }
        if (videoId) {
            fetchSelectedVideo(videoId);
            fetchComments(videoId); // Ensure this line is correct
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

    const fetchComments = async (videoId) => {
        try {
            const response = await axios.get(`http://test-course.test/api/videos/${videoId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('There was an error fetching the comments!', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://test-course.test/api/comments', {
                ...newComment,
                video_id: videoId
            });
            setComments([...comments, response.data]);
            setNewComment({ comment: '', name: '', gender: 'male' });
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
        }
    };

    const handleDeleteComment = async (id, commentOwner) => {
        if (currentUser !== commentOwner) {
            alert('You are not allowed to delete this comment.');
            return;
        }
        try {
            await axios.delete(`http://test-course.test/api/comments/${id}`, {
                data: { name: currentUser } // إرسال اسم المستخدم الحالي مع طلب الحذف
            });
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
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
                <div className="comments mt-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onDelete={() => handleDeleteComment(comment.id, comment.name)}
                        />
                    ))}
                    <form onSubmit={handleSubmitComment} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newComment.name}
                                onChange={handleCommentChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={newComment.gender}
                                onChange={handleCommentChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={newComment.comment}
                                onChange={handleCommentChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
