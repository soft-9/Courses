import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ videoId, currentUser, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');

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
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            onCommentAdded(response.data);
            setNewComment('');
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
        }
    };

    return (
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
    );
};

export default CommentForm;
