import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({ videoId, currentUser }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://test-course.test/api/videos/${videoId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('There was an error fetching the comments!', error);
            }
        };

        fetchComments();
    }, [videoId]);

    const handleDeleteComment = async (id, userId) => {
        if (currentUser.id !== userId) {
            alert('You are not allowed to delete this comment.');
            return;
        }

        try {
            await axios.delete(`http://test-course.test/api/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    return (
        <div>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onDelete={handleDeleteComment}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
};

export default Comments;
