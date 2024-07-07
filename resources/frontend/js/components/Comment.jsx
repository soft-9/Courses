import React, { useState } from 'react';
import axios from 'axios';
import male from '../img/Gender/male.png';
import female from '../img/Gender/female.png';

const Comment = ({ comment, onDelete, onUpdate, currentUser }) => {
    const { id, comment: text, name, gender, profile_picture, user_id } = comment;
    const defaultPicture = gender === 'male' ? male : female;
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(text);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            onDelete(id);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedComment(text);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://test-course.test/api/comments/${id}`, {
                comment: editedComment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            onUpdate(id, response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('There was an error updating the comment!', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center mb-2">
                <img
                    src={profile_picture ? profile_picture : defaultPicture}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                </div>
            </div>
            {isEditing ? (
                <>
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <div className="mt-2 flex">
                        <button
                            onClick={handleSaveEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-gray-800">{text}</p>
                    <div className="mt-2 flex">
                        {currentUser && user_id === currentUser.id && (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="text-blue-500 hover:text-blue-700 font-semibold text-sm mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Comment;
