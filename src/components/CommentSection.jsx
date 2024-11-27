import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "../styles/Comment.css";
import { useAuth, useToast } from "../context";
import API from "../api";

const CommentSection = ({ postId }) => {
    const [newComment, setNewComment] = useState("");
    const { notifyError, notifySuccess } = useToast()
    const { token } = useAuth();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await API.get(`/comments/${postId}`)
                setComments(response.data.data)
            } catch (error) {
                notifyError(error.response.data.message)
            }
        }
        fetchComments()
    }, [postId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(`/comments/${postId}`, { content: newComment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setComments([response.data.data, ...comments]);
            setNewComment("")
        } catch (error) {
            notifyError(error.response.data.message)
        }
    };

    return (
        <div className="comment-section">
            <h2>Comments</h2>
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <button type="submit">Add Comment</button>
            </form>
            <div className="comments-list">
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
