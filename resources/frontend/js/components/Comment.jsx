import React from 'react';
import male from '../img/Gender/male.png';
import female from '../img/Gender/female.png';

const Comment = ({ comment, onDelete, onEdit }) => {
    const { id, comment: text, name, gender } = comment;

    // Convert gender to lowercase to handle case sensitivity
    const profileImage = gender.toLowerCase() === 'male' ? male : female;

    return (
        <div className="comment p-4 border rounded mb-4">
            <div className="flex items-center mb-2">
                <img src={profileImage} alt={gender} className="w-8 h-8 rounded-full mr-2" />
                <div>
                    <strong>{name}</strong>
                </div>
            </div>
            <p>{text}</p>
            <button onClick={() => onEdit(id)} className="mr-2">Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default Comment;
