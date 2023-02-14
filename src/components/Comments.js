import React, { useEffect, useState } from "react";

const Comments = ({ caseId, newComment, setCommentResponse, commentResponse }) => {
    const [comments, setComments] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost:5000/comments/${caseId}`, {
            headers: {"Authorization": token}
        })
        .then(r => r.json())
        .then((data) => {
            if (!data.errors){
                setComments(data)
                setCommentResponse(true)
            } else {
                setCommentResponse(false)
            }
        })
    }, [newComment]);

    const commentList = comments ?
                        comments.map(comment => <li key={comment.id}>{comment.comment} -{comment.first_name} {comment.last_name}</li>) :
                        ''

    return (
        <ul>
            {commentResponse ? commentList : ''}
        </ul>
    )
}

export default Comments;