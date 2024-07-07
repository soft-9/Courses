import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment';

const VideoPlayer = ({ currentUser, token }) => {
    const { courseId, videoId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
            fetchCourseVideos();
        }
        if (videoId) {
            fetchSelectedVideo(videoId);
            fetchComments(videoId);
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
        setNewComment(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://test-course.test/api/comments', {
                comment: newComment,
                video_id: videoId,
                name: currentUser.name,
                gender: currentUser.gender
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
        }
    };

    const handleDeleteComment = async (id) => {
        if (!currentUser) {
            alert('You must be logged in to delete a comment.');
            return;
        }
        try {
            await axios.delete(`http://test-course.test/api/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    const handleUpdateComment = (id, updatedComment) => {
        setComments(comments.map(comment => comment.id === id ? updatedComment : comment));
    };

    const goToVideoPlayer = (videoId) => {
        navigate(`/course/${courseId}/video/${videoId}`);
    };

    const renderVideoPlayer = () => {
        if (selectedVideo) {
            const videoUrl = selectedVideo.url || `http://test-course.test/storage/videos/${selectedVideo.file}`;
            return (
                <>
                    <h1 className="text-3xl font-bold mb-4">{selectedVideo.title}</h1>
                    <video src={videoUrl} controls className="w-full h-64" />
                </>
            );
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
                        className={`video bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer ${video.id === parseInt(videoId) ? 'bg-gray-300' : ''}`}
                        onClick={() => goToVideoPlayer(video.id)}
                    >
                        <h3 className="text-lg font-semibold">{video.title}</h3>
                    </div>
                ))}
            </div>
            <div className="w-3/4">
                {renderVideoPlayer()}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    {token ? (
                        <form onSubmit={handleSubmitComment} className="mb-4">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Add a comment..."
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p>You must be logged in to comment.</p>
                    )}
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onDelete={handleDeleteComment}
                            onUpdate={handleUpdateComment}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
