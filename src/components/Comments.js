import React, { useEffect, useState } from "react";

const Comments = ( {caseId, newComment} ) => {
    const [comments, setComments] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost:5000/cases/${caseId}/comments`, {
            headers: {"Authorization": token}
        })
        .then(r => r.json())
        .then(data => setComments(data))
    }, [newComment]);

    const commentList = comments ?
                        comments.map(comment => <li key={comment.id}>{comment.comment} -{comment.name}</li>) :
                        ''

    return (
        <ul>{commentList}</ul>
    )
}

export default Comments;