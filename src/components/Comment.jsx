import React from "react";
import "../styles/Comment.css";

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p className="comment-author">{comment.author.name}</p>
            <p>{comment.content}</p>
        </div>
    );
};

export default Comment;
