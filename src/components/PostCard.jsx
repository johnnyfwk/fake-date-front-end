import { Link } from "react-router-dom";

export default function PostCard({post}) {
    const date = new Date(post.post_date).toLocaleDateString();
    const time = new Date(post.post_date).toLocaleTimeString();

    return (
        <div className="post-card">
            <Link to={`/profile/${post.user_id}`} className="post-card-owner">
                <img src={post.avatar_url} alt={post.avatar_url}></img>
                <div>{post.username}</div>
            </Link>
            <Link to={`/posts/${post.post_id}`} className="post-card-body">
                <div>Posted: {new Date(post.post_date).toLocaleDateString()} {new Date(post.post_date).toLocaleTimeString()}</div>
                <div>Seeking: {post.gender_of_date}</div>
                <div>Occasion: {post.occasion}</div>
                <div>City: {post.city}</div>
                <div>Date: {post.date}</div>
                <div>{post.description}</div>
            </Link>
        </div>
    )
}