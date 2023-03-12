import { Link } from "react-router-dom";

export default function PostCard({post}) {
    const date = new Date(post.post_date).toLocaleDateString();
    const time = new Date(post.post_date).toLocaleTimeString();

    return (
        <div id="post-card">
            <div id="post-card-owner">
                <Link to={`/profile/${post.user_id}`}>
                    <img src={post.avatar_url} alt={post.avatar_url}></img>
                </Link>
                <Link to={`/profile/${post.user_id}`}>{post.username}</Link>
            </div>            
            <Link to={`/posts/${post.post_id}`} id="post-card-body">
                <div id="post-card-title">{post.title}</div>
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