import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";

export default function Post() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {post_id} = useParams();

    const [post, setPost] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        api.getPostById(post_id)
            .then((response) => {
                setPost(response);
            })
            .catch((error) => {

            })
    }, [])

    return (
        <main>
            <h1>Post</h1>
            <Link to={`/profile/${post.user_id}`}>
                <img src={post.avatar_url} id="post-avatar-image"/>
            </Link>            
            <Link to={`/profile/${post.user_id}`}>{post.username}</Link>
            <div>Posted: {new Date(post.post_date).toLocaleDateString()} {new Date(post.post_date).toLocaleTimeString()}</div>
            <div>Seeking: {post.gender_of_date}</div>
            <div>Occasion: {post.occasion}</div>
            <div>City: {post.city}</div>
            <div>Date: {new Date(post.date).toLocaleDateString()}</div>
            <div>{post.description}</div>

            <h2>Comments</h2>
        </main>
    )
}