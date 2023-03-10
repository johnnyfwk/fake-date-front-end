export default function PostCard({post}) {
    const date = new Date(post.post_date).toLocaleDateString();
    const time = new Date(post.post_date).toLocaleTimeString();

    return (
        <div className="post-card">
            <div>{date}</div>
            <div>{time}</div>
            <img src={post.avatar_url} alt={post.avatar_url}></img>
            <div>{post.username}</div>
            <div>{post.destination}</div>
            <div>Arrival date: {post.arrival_date}</div>
            <div>Departure date: {post.departure_date}</div>
            <div>{post.description}</div>
        </div>
    )
}