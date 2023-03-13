import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";
import PostCard from "../components/PostCard";
import ReplyCard from "../components/ReplyCard";

export default function Profile({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {user_id} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isGetUsersSuccessful, setIsGetUsersSuccessful] = useState(null);
    const [user, setUser] = useState({});

    const [usersPosts, setUsersPosts] = useState();
    const [isUsersPostsLoading, setIsUsersPostsLoading] = useState(true);
    const [isGetUsersPostsSuccessful, setIsGetUsersPostsSuccessful] = useState(null);

    const [usersReplies, setUsersReplies] = useState();
    const [isUsersRepliesLoading, setIsUsersRepliesLoading] = useState(true);
    const [isGetUsersRepliesSuccessful, setIsGetUsersRepliesSuccessful] = useState(null);

    const [isReplyUpdatedSuccessfully, setIsReplyUpdatedSuccessfully] = useState(null);

    const [visibleTab, setVisibleTab] = useState("Posts");

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])
    
    useEffect(() => {
        setIsLoading(true);
        setIsGetUsersSuccessful(null);
        api.getUsers()
            .then((response) => {
                setIsLoading(false);
                setIsGetUsersSuccessful(true);
                const userDetails = response.filter((user) => {
                    return user.user_id === parseInt(user_id);
                })
                setUser(userDetails[0]);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsGetUsersSuccessful(false);
            })
    }, [user_id])

    useEffect(() => {
        setIsUsersPostsLoading(true);
        setIsGetUsersPostsSuccessful(null);
        api.getPostsByUserId(user_id)
            .then((response) => {
                setIsUsersPostsLoading(false);
                setIsGetUsersPostsSuccessful(true);
                setUsersPosts(response);
            })
            .catch((error) => {
                setIsUsersPostsLoading(false);
                setIsGetUsersPostsSuccessful(false);
            })
    }, [user_id])

    useEffect(() => {
        setIsUsersRepliesLoading(true);
        setIsGetUsersRepliesSuccessful(null);
        api.getRepliesByUserId(user_id)
            .then((response) => {
                setIsUsersRepliesLoading(false);
                setIsGetUsersRepliesSuccessful(true);
                setUsersReplies(response);
            })
            .catch((error) => {
                setIsUsersRepliesLoading(false);
                setIsGetUsersRepliesSuccessful(false);
            })
    }, [user_id])

    function handleTabSelection(event) {
        setVisibleTab(event.target.innerText);
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isGetUsersSuccessful === false) {
        return <p className="error">User information could not be loaded.</p>
    }

    return (
        <main>
            <h1>{user.username}</h1>

            <section id="profile-info">
                <img src={user.avatar_url} alt={user.avatar_url} id="profile-avatar-image"></img>
                <div>Join date: {new Date(user.join_date).toLocaleDateString()}</div>
                <div>Gender: {user.gender}</div>
            </section>

            <section id="profile-tabs">
                <h2 onClick={handleTabSelection} value="posts">Posts</h2>
                {userLoggedIn.user_id === user.user_id
                    ? <h2 onClick={handleTabSelection} value="replies">Replies</h2>
                    : null}                
            </section>

            {visibleTab === "Posts"
                ? <section id="profile-posts">
                    {isUsersPostsLoading ? <p>Loading posts...</p> : null}
                    {isGetUsersPostsSuccessful === null || isGetUsersPostsSuccessful === true
                        ? null
                        : <p className="error">Posts could not be loaded.</p>}
                    {usersPosts?.length === 0 ? <p>No posts created.</p> : null}
                    
                    <div id="post-cards">
                        {usersPosts
                            ? usersPosts.map((post) => {
                                return <PostCard key={post.post_id} post={post}/>;
                                })
                            : null}
                    </div>
                  </section>
                : null}
            
            {visibleTab === "Replies"
                ? <section id="profile-replies">
                    {isUsersRepliesLoading ? <p>Loading replies...</p> : null}
                    {isGetUsersRepliesSuccessful === null || isGetUsersRepliesSuccessful === true
                        ? null
                        : <p className="error">Replies could not be loaded.</p>}
                    {usersReplies?.length === 0 ? <p>No replies made.</p> : null}
                    
                    <div id="reply-cards">
                        {usersReplies
                            ? usersReplies.map((reply) => {
                                return <ReplyCard
                                    key={reply.reply_id}
                                    reply={reply}/>
                            })
                            : null}
                    </div>
                  </section>
                : null}
        </main>
    )
}