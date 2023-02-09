import React, { useState } from "react";

const CommentForm = ({ caseId, user, addComment }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [errorsList, setErrorsList] = useState([]);
    const token = localStorage.getItem("token");
    const [newComment, setNewComment] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        case_id: caseId,
        comment: ''    
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();
            fetch(`http://localhost:5000/comments/${caseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newComment),
        })
        .then(r => r.json())
        .then(data => {
            if (!data.errors) {
                addComment(data)
                setShowTextField(false)
            } else {
                const errors = data.errors.map(e => <li>{e}</li>)
                setErrorsList(errors)
            }
        })
    }

    const handleChange = (e) => {
        setNewComment({
            ...newComment, [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <button onClick={() => setShowTextField(!showTextField)}>
                {showTextField ? 'Cancel' : 'Add comment'}
            </button>
            <form onSubmit={handleSubmit}>
                {showTextField ? <input type='text' name='comment' onChange={handleChange}/> 
                                : null}
                {showTextField ? <button type='submit'>Add comment</button> : null}
                <br/>
                <ul style={{ color: 'red' }}>
                    {errorsList}
                </ul>
            </form>
        </div>
    )
}

export default CommentForm;