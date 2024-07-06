import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ comment, name, gender });
        setComment('');
        setName('');
        setGender('male');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
