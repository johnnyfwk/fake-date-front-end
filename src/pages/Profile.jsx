import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";
import PostCard from "../components/PostCard";
import ReplyCard from "../components/ReplyCard";
import Gender from "../components/Gender";
import Avatar from "../components/Avatar";

export default function Profile() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {user_id} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isGetUserInfoSuccessful, setIsGetUserInfoSuccessful] = useState(null);
    const [user, setUser] = useState({});

    const [usersPosts, setUsersPosts] = useState();
    const [isUsersPostsLoading, setIsUsersPostsLoading] = useState(true);
    const [isGetUsersPostsSuccessful, setIsGetUsersPostsSuccessful] = useState(null);

    const [usersReplies, setUsersReplies] = useState();
    const [isUsersRepliesLoading, setIsUsersRepliesLoading] = useState(true);
    const [isGetUsersRepliesSuccessful, setIsGetUsersRepliesSuccessful] = useState(null);

    const [visibleTab, setVisibleTab] = useState("Posts");

    const [isProfileBeingEdited, setIsProfileBeingEdited] = useState(false);
    const [isEditProfileButtonVisible, setIsEditProfileButtonVisible] = useState(true);
    const [isCancelEditProfileButtonVisible, setIsCancelEditProfileButtonVisible] = useState(false);
    const [isUpdateProfileButtonVisible, setIsUpdateProfileButtonVisible] = useState(false);
    const [isDeleteProfileButtonVisible, setIsDeleteProfileButtonVisible] = useState(true);
    const [isDeleteProfileConfirmationMessageAndButtonsVisible, setIsDeleteProfileConfirmationMessageAndButtonsVisible] = useState(false);

    const [genderInput, setGenderInput] = useState("default");
    const [avatarUrlInput, setAvatarUrlInput] = useState("");
    const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(null);
    const [isProfileUpdatedSuccessfully, setIsProfileUpdatedSuccessfully] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsLoading(true);
        setIsGetUserInfoSuccessful(null);
        api.getUserById(user_id)
            .then((response) => {
                setIsLoading(false);
                setIsGetUserInfoSuccessful(true);
                setUser(response);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsGetUserInfoSuccessful(false);
            })
    }, [user_id, isProfileUpdatedSuccessfully])

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
    }, [user_id, isProfileUpdatedSuccessfully])

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
    }, [user_id, isProfileUpdatedSuccessfully])

    function handleTabSelection(event) {
        setVisibleTab(event.target.innerText);
    }

    function onClickEditProfileButton() {
        setIsProfileBeingEdited(true);
        setIsEditProfileButtonVisible(false);
        setIsCancelEditProfileButtonVisible(true);
        setIsUpdateProfileButtonVisible(true);
        setIsDeleteProfileButtonVisible(false);
        setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
        setGenderInput(user.gender);
        setAvatarUrlInput(user.avatar_url);
        setIsAvatarUrlValid(true);
    }

    function onClickCancelEditProfileButton() {
        setIsProfileBeingEdited(false);
        setIsEditProfileButtonVisible(true);
        setIsCancelEditProfileButtonVisible(false);
        setIsUpdateProfileButtonVisible(false);
        setIsDeleteProfileButtonVisible(true);
        setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
        setIsAvatarUrlValid(null);
    }

    function editProfile(userId, gender, avatarUrl) {
        setIsProfileUpdatedSuccessfully(null);
        api.editProfileById(user_id, gender, avatarUrl)
            .then((response) => {
                setIsProfileBeingEdited(false);
                setIsProfileUpdatedSuccessfully(true);
                setIsEditProfileButtonVisible(true);
                setIsCancelEditProfileButtonVisible(false);
                setIsUpdateProfileButtonVisible(false);
                setIsDeleteProfileButtonVisible(true);
                setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
                setTimeout(() => setIsProfileUpdatedSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsProfileBeingEdited(true);
                setIsProfileUpdatedSuccessfully(false);
                setIsEditProfileButtonVisible(false);
                setIsCancelEditProfileButtonVisible(true);
                setIsUpdateProfileButtonVisible(true);
                setIsDeleteProfileButtonVisible(false);
                setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
                setTimeout(() => setIsProfileUpdatedSuccessfully(null), 3000);
            })
    }

    function onClickUpdateProfileButton() {
        setIsAvatarUrlValid(null);
        const avatarUrlIsValid = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(avatarUrlInput);
        if (avatarUrlInput.length > 0) {
            if (avatarUrlIsValid) {
                setIsAvatarUrlValid(true);
                editProfile(user_id, genderInput, avatarUrlInput);
            } else {
                setIsAvatarUrlValid(false);
            }
        } else {
            setIsAvatarUrlValid(true);
            editProfile(user_id, genderInput, "http://cdn.onlinewebfonts.com/svg/img_258083.png");
        }
    }

    function onClickDeleteProfileButton() {
        setIsProfileBeingEdited(false);
        setIsEditProfileButtonVisible(false);
        setIsCancelEditProfileButtonVisible(false);
        setIsUpdateProfileButtonVisible(false);
        setIsDeleteProfileButtonVisible(false);
        setIsDeleteProfileConfirmationMessageAndButtonsVisible(true);
    }

    function onClickDeleteProfileNoButton() {
        setIsProfileBeingEdited(false);
        setIsEditProfileButtonVisible(true);
        setIsCancelEditProfileButtonVisible(false);
        setIsUpdateProfileButtonVisible(false);
        setIsDeleteProfileButtonVisible(true);
        setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
    }

    function onClickDeleteProfileYesButton() {
        setIsProfileBeingEdited(false);
        setIsEditProfileButtonVisible(true);
        setIsCancelEditProfileButtonVisible(false);
        setIsUpdateProfileButtonVisible(false);
        setIsDeleteProfileButtonVisible(true);
        setIsDeleteProfileConfirmationMessageAndButtonsVisible(false);
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isGetUserInfoSuccessful === false) {
        return <p className="error">User information could not be loaded.</p>
    }

    return (
        <main>
            <h1>{user.username}</h1>

            <section id="profile-info">
                <img src={user.avatar_url} alt={user.avatar_url} id="profile-avatar-image"></img>

                {userLoggedIn.user_id === parseInt(user_id) && isAvatarUrlValid === false
                    ? <p className="error">Please enter a valid image URL.</p>
                    : null}
                
                {userLoggedIn.user_id !== parseInt(user_id)
                    ? null
                    : isProfileUpdatedSuccessfully === null
                        ? null
                        : isProfileUpdatedSuccessfully === true
                            ? <p className="success">Profile has been updated.</p>
                            : <p className="error">Profile could not be updated.</p>}

                <div>Join date: {new Date(user.join_date).toLocaleDateString()}</div>

                {userLoggedIn.user_id === user.user_id && isProfileBeingEdited
                    ? <div>
                        <Gender genderInput={genderInput} setGenderInput={setGenderInput} />
                        <Avatar avatarUrlInput={avatarUrlInput} setAvatarUrlInput={setAvatarUrlInput} setIsAvatarUrlValid={setIsAvatarUrlValid} />
                      </div>
                    : <div>Gender: {user.gender}</div>}                    

                <div id="profile-buttons">
                    {userLoggedIn.user_id === user.user_id && isEditProfileButtonVisible
                        ? <button onClick={onClickEditProfileButton}>Edit</button>
                        : null}
                    
                    {userLoggedIn.user_id === user.user_id && isCancelEditProfileButtonVisible
                        ? <button onClick={onClickCancelEditProfileButton}>Cancel</button>
                        : null}
                    
                    {userLoggedIn.user_id === user.user_id && isUpdateProfileButtonVisible
                        ? <button onClick={onClickUpdateProfileButton}>Update</button>
                        : null}
                    
                    {userLoggedIn.user_id === user.user_id && isDeleteProfileButtonVisible
                        ? <button onClick={onClickDeleteProfileButton}>Delete</button>
                        : null}
                    
                    {userLoggedIn.user_id === user.user_id && isDeleteProfileConfirmationMessageAndButtonsVisible
                        ? <div>
                            <span className="confirm">Delete profile?</span>
                            <button onClick={onClickDeleteProfileNoButton}>No</button>
                            <button onClick={onClickDeleteProfileYesButton}>Yes</button>
                          </div>
                        : null}
                </div>
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
                    {usersPosts?.length === 0 ? <div>No posts created.</div> : null}
                    
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