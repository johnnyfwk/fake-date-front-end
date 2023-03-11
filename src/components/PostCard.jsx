export default function PostCard({post}) {
    const date = new Date(post.post_date).toLocaleDateString();
    const time = new Date(post.post_date).toLocaleTimeString();

    return (
        <div className="post-card">
            <div>{date}</div>
            <div>{time}</div>
            <img src={post.avatar_url} alt={post.avatar_url}></img>
            <div>{post.username}</div>
            <div>Seeking: {post.gender_of_date}</div>
            <div>City: {post.city}</div>
            <div>Date: {post.date}</div>
            <div>Occasion: {post.occasion}</div>
            <div>{post.description}</div>
        </div>
    )
}