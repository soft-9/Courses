import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import axios from 'axios';

const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        // Fetch comments when component mounts
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

    const handleAddComment = async (newComment) => {
        try {
            const response = await axios.post('http://test-course.test/api/comments', {
                ...newComment,
                video_id: videoId
            });
            setComments([...comments, response.data]);
        } catch (error) {
            console.error('There was an error submitting the comment!', error);
        }
    };

    const handleEditComment = (id) => {
        const comment = comments.find((comment) => comment.id === id);
        setEditingComment(comment);
    };

    const handleUpdateComment = async (updatedComment) => {
        try {
            const response = await axios.put(`http://test-course.test/api/comments/${updatedComment.id}`, updatedComment);
            setComments(comments.map((comment) => (comment.id === updatedComment.id ? response.data : comment)));
            setEditingComment(null);
        } catch (error) {
            console.error('There was an error updating the comment!', error);
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await axios.delete(`http://test-course.test/api/comments/${id}`);
            setComments(comments.filter((comment) => comment.id !== id));
        } catch (error) {
            console.error('There was an error deleting the comment!', error);
        }
    };

    return (
        <div className="comments">
            {editingComment ? (
                <CommentForm onSubmit={handleUpdateComment} initialComment={editingComment} />
            ) : (
                <CommentForm onSubmit={handleAddComment} initialComment={{ comment: '', name: '', gender: 'male' }} />
            )}
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onDelete={handleDeleteComment}
                    onEdit={handleEditComment}
                />
            ))}
        </div>
    );
};

export default Comments;
