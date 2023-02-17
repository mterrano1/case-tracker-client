import React, { useEffect, useState } from "react";

const Comments = ({ caseId, newComment, setCommentResponse, commentResponse }) => {
    const [comments, setComments] = useState('');
    const token = localStorage.getItem("token");

    // Fetches comments from the server when the component mounts or new comments are added
    useEffect(() => {
        fetch(`/flask/comments/${caseId}`, {
            headers: {"Authorization": token}
        })
        .then(r => r.json())
        .then((data) => {
            if (!data.errors){
                // If the request is successful, set the comments state with the received data
                setComments(data)
                // Set the commentResponse state to true to display the comments
                setCommentResponse(true)
            } else {
                // If there is an error, set the commentResponse state to false to hide the comments
                setCommentResponse(false)
            }
        })
    }, [newComment]);

    // Ternary that creates a list of comments to be displayed if there are any
    const commentList = comments ?
                        comments.map(comment => <li key={comment.id}>{comment.comment} -{comment.first_name} {comment.last_name}</li>) :
                        ''

    // Returns a ul element with the comment list if there is at least one comment to display
    return (
        <ul>
            {commentResponse ? commentList : ''}
        </ul>
    )
}

export default Comments;