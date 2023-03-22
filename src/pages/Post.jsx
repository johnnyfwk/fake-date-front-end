import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";
import ReplyCard from "../components/ReplyCard";
import Title from "../components/Title";
import Cities from "../components/Cities";
import DateOfDate from "../components/DateOfDate";
import GenderOfDate from "../components/GenderOfDate";
import Occasion from "../components/Occasion";
import Description from "../components/Description";

export default function Post() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {post_id} = useParams();

    const [isPostLoading, setIsPostLoading] = useState(true);
    const [isPostLoadedSuccessfully, setIsPostLoadedSuccessfully] = useState(null);
    const [post, setPost] = useState({});    
    const [isRepliesLoading, setIsRepliesLoading] = useState(true);
    const [isRepliesLoadedSuccessfully, setIsRepliesLoadedSuccessfully] = useState(null);
    const [replies, setReplies] = useState([]);
    const [replyInput, setReplyInput] = useState("");
    const [isReplyPostedSuccessfully, setIsReplyPostedSuccessfully] = useState(null);
    const [isReplyUpdatedSuccessfully, setIsReplyUpdatedSuccessfully] = useState(null);
    const [isReplyDeletedSuccessfully, setIsReplyDeletedSuccessfully] = useState(null);

    const [isEditPostButtonVisible, setIsEditPostButtonVisible] = useState(true);
    const [isDeletePostButtonVisible, setIsDeletePostButtonVisible] = useState(true);
    const [isCancelEditPostButtonVisible, setIsCancelEditPostButtonVisible] = useState(false);
    const [isUpdatePostButtonVisible, setIsUpdatePostButtonVisible] = useState(false);
    const [isDeletePostConfirmationMessageAndButtonsVisible, setIsDeletePostConfirmationMessageAndButtonsVisible] = useState(false);
    const [isPostBeingEdited, setIsPostBeingEdited] = useState(false);

    const [titleInput, setTitleInput] = useState("");
    const [genderOfDateInput, setGenderOfDateInput] = useState("default");
    const [cityInput, setCityInput] = useState("default");
    const [occasionInput, setOccasionInput] = useState("default");
    const [dateInput, setDateInput] = useState("");
    const [isDateValid, setIsDateValid] = useState(true);    
    const [descriptionInput, setDescriptionInput] = useState("");
    const [isPostUpdatedSuccessfully, setIsPostUpdatedSuccessfully] = useState(null);
    const [isPostDeletedSuccessfully, setIsPostDeletedSuccessfully] = useState(null);
    const [areRepliesByPostIdDeletedSuccessfully, setAreRepliesByPostIdDeletedSuccessfully] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsPostLoading(true);
        setIsPostLoadedSuccessfully(null);
        api.getPostById(post_id)
            .then((response) => {
                setIsPostLoading(false);
                setIsPostLoadedSuccessfully(true);
                setPost(response);
            })
            .catch((error) => {
                setIsPostLoading(false);
                setIsPostLoadedSuccessfully(false);
            })
    }, [isPostUpdatedSuccessfully])

    useEffect(() => {
        setIsRepliesLoading(true);
        setIsRepliesLoadedSuccessfully(null);
        api.getRepliesByPostId(post_id)
            .then((response) => {
                setIsRepliesLoading(false);
                setIsRepliesLoadedSuccessfully(true);
                setReplies(response);
            })
            .catch((error) => {
                setIsRepliesLoading(false);
                setIsRepliesLoadedSuccessfully(false);
            })
    }, [isReplyPostedSuccessfully, isReplyUpdatedSuccessfully, isReplyDeletedSuccessfully])

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onClickSendReplyButton() {
        setIsReplyPostedSuccessfully(null);
        api.replyToAPost(new Date(), replyInput, post_id, userLoggedIn.user_id)
            .then((response) => {
                setIsReplyPostedSuccessfully(true);
                setTimeout(() => setIsReplyPostedSuccessfully(null), 3000);
                setReplyInput("");
                return api.editPostById(post_id, new Date(), post.title, post.city, post.gender_of_date, post.date, post.occasion, post.description)
            })
            .catch((error) => {
                setIsReplyPostedSuccessfully(false);
                setTimeout(() => setIsReplyPostedSuccessfully(null), 3000);
            })
    }

    function handleReplyInput(event) {
        setReplyInput(event.target.value);
    }

    function onClickEditPostButton() {
        setIsPostBeingEdited(true);
        setIsEditPostButtonVisible(false);
        setIsDeletePostButtonVisible(false);
        setIsCancelEditPostButtonVisible(true);
        setIsUpdatePostButtonVisible(true);
        setIsDeletePostConfirmationMessageAndButtonsVisible(false);
        setTitleInput(post.title);
        setGenderOfDateInput(post.gender_of_date);
        setCityInput(post.city);
        setOccasionInput(post.occasion);
        setDateInput(post.date);
        setDescriptionInput(post.description);
    }

    function onClickDeletePostButton() {
        setIsPostBeingEdited(false);
        setIsEditPostButtonVisible(false);
        setIsDeletePostButtonVisible(false);
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsDeletePostConfirmationMessageAndButtonsVisible(true);
        setIsPostDeletedSuccessfully(null);
    }

    function onClickCancelEditPostButton() {
        setIsPostBeingEdited(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsDeletePostConfirmationMessageAndButtonsVisible(false);
        setIsDateValid(true);
    }

    function onClickUpdatePostButton() {
        setIsPostBeingEdited(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsDeletePostConfirmationMessageAndButtonsVisible(false);
        api.editPostById(post_id, new Date(), titleInput, cityInput, genderOfDateInput, dateInput, occasionInput, descriptionInput)
            .then((response) => {
                setIsPostUpdatedSuccessfully(true);
                setTimeout(() => setIsPostUpdatedSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsPostUpdatedSuccessfully(false);
                setTimeout(() => setIsPostUpdatedSuccessfully(null), 3000);
            })
    }

    function onClickDeletePostNoButton() {
        setIsPostBeingEdited(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsDeletePostConfirmationMessageAndButtonsVisible(false);
    }

    function onClickDeletePostYesButton() {
        setIsPostBeingEdited(false);
        setIsEditPostButtonVisible(true);
        setIsDeletePostButtonVisible(true);
        setIsCancelEditPostButtonVisible(false);
        setIsUpdatePostButtonVisible(false);
        setIsDeletePostConfirmationMessageAndButtonsVisible(false);
        setAreRepliesByPostIdDeletedSuccessfully(null);
        setIsPostDeletedSuccessfully(null);
        api.deleteRepliesByPostId(post_id)
            .then((response) => {
                setAreRepliesByPostIdDeletedSuccessfully(true);
                return api.deletePostById(post_id);
            })
            .then((response) => {
                setIsPostDeletedSuccessfully(true);
                navigate("/home");
            })
            .catch((error) => {
                setAreRepliesByPostIdDeletedSuccessfully(false);
                setIsPostDeletedSuccessfully(false);
                setTimeout(() => setAreRepliesByPostIdDeletedSuccessfully(null), 3000);
                setTimeout(() => setIsPostDeletedSuccessfully(null), 3000);
            })
    }

    const componentCitiesStylePost = {};

    if (isPostLoading) {
        return (
            <div className="main">
                <main>
                    <p>Post is loading...</p>
                </main>
            </div>
        )
    }

    if (isPostLoadedSuccessfully === false) {
        return (
            <div className="main">
                <main>
                    <p>Post could not be loaded.</p>
                </main>
            </div>
        )
    }

    return (
        <div className="main">
            <main id="post">
                <h1>{post.title}</h1>

                {isPostUpdatedSuccessfully === null
                    ? null
                    : isPostUpdatedSuccessfully === true
                        ? <p className="success">Post has been updated.</p>
                        : <p className="error">Post could not be updated.</p>}

                {isPostDeletedSuccessfully === null
                    ? null
                    : isPostDeletedSuccessfully === true
                        ? <p className="success">Post has been deleted.</p>
                        : <p className="error">Post could not be deleted.</p>}
                
                {areRepliesByPostIdDeletedSuccessfully === null
                    ? null
                    : areRepliesByPostIdDeletedSuccessfully === true
                        ? <p className="success">Replies for this post have been deleted.</p>
                        : <p className="error">Replies for this post could not be deleted.</p>}

                <section id="post-info">
                    <div id="post-owner">
                        <Link to={`/profile/${post.user_id}`}>
                            <img src={post.avatar_url} alt={post.avatar_url} id="post-avatar-image"/>
                        </Link>            
                        <Link to={`/profile/${post.user_id}`} id="post-owner-username">{post.username}</Link>
                    </div>

                    {isPostBeingEdited
                        ? <div>
                            {isDateValid === null || isDateValid === true
                                ? null
                                : <p className="error">Please select a date that is the same as or after today's date.</p>}

                            <div className="post-components">
                                <Title titleInput={titleInput} setTitleInput={setTitleInput} />
                                <GenderOfDate genderOfDateInput={genderOfDateInput} setGenderOfDateInput={setGenderOfDateInput} />
                                <Cities cityInput={cityInput} setCityInput={setCityInput} componentCitiesStyle={componentCitiesStylePost} />
                                <Occasion occasionInput={occasionInput} setOccasionInput={setOccasionInput} />
                                <DateOfDate dateInput={dateInput} setDateInput={setDateInput} setIsDateValid={setIsDateValid} />                        
                                <Description descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}/>
                            </div>
                        </div>
                        : <div id="post-body">
                            <div><b>Seeking:</b> {post.gender_of_date}</div>
                            <div><b>City:</b> {post.city}</div>
                            <div><b>Occasion:</b> {post.occasion}</div>
                            <div><b>Date:</b> {new Date(post.date).toLocaleDateString()}</div>
                            <div><b>Posted:</b> {new Date(post.post_date).toLocaleTimeString()} {new Date(post.post_date).toLocaleDateString()}</div>
                            <p>{post.description}</p>
                        </div>}

                    <div className="buttons">
                        {userLoggedIn.user_id === post.user_id && isEditPostButtonVisible
                            ? <button onClick={onClickEditPostButton}>Edit</button>
                            : null}
                        
                        {userLoggedIn.user_id === post.user_id && isDeletePostButtonVisible
                            ? <button onClick={onClickDeletePostButton}>Delete</button>
                            : null}

                        {userLoggedIn.user_id === post.user_id && isCancelEditPostButtonVisible
                            ? <button onClick={onClickCancelEditPostButton}>Cancel</button>
                            : null}
                        
                        {userLoggedIn.user_id === post.user_id && isUpdatePostButtonVisible
                            ? <button onClick={onClickUpdatePostButton} disabled={!titleInput || !cityInput || !genderOfDateInput || !dateInput || !isDateValid || !occasionInput || !descriptionInput}>Update</button>
                            : null}

                        {userLoggedIn.user_id === post.user_id && isDeletePostConfirmationMessageAndButtonsVisible
                            ? <div id="delete-post-confirmation-message-and-buttons">
                                <span className="confirm">Delete post?</span>
                                <div className="buttons">
                                    <button onClick={onClickDeletePostNoButton}>No</button>
                                    <button onClick={onClickDeletePostYesButton}>Yes</button>
                                </div>
                            </div>
                            : null}
                    </div>
                </section>

                <section>
                    <h2>Send a Reply</h2>

                    {new Date(post.date).toISOString() < new Date().toISOString()
                        ? <p className="error">This date has passed.</p>
                        : null}

                    {isReplyPostedSuccessfully === null
                        ? null
                        : isReplyPostedSuccessfully === true
                            ? <p className="success">Your reply was posted.</p>
                            : <p className="error">Your reply could not be posted.</p>}

                    {userLoggedIn.user_id === post.user_id || userLoggedIn.gender === post.gender_of_date || post.gender_of_date === "Either"
                        ? <form onSubmit={handleSubmit}>
                            <div id="post-reply-textarea-and-character-count">
                                <label htmlFor="post-reply"></label>
                                <textarea
                                    id="post-reply"
                                    name="post-reply"
                                    maxLength="300"
                                    value={replyInput}
                                    onChange={handleReplyInput}
                                ></textarea>
                                <div id="input-character-count">{replyInput.length}/300</div>
                            </div>
                            <div id="post-reply-send-button">
                                <button onClick={onClickSendReplyButton} disabled={!replyInput}>Send</button>
                            </div>
                        </form>
                        : <p className="error">This user is looking for a {post.gender_of_date} date.</p>}
                </section>

                <section>
                    <h2>Replies ({replies.length})</h2>

                    {isRepliesLoading ? <p>Replies are loading...</p> : null}
                    {replies.length ? null : <p>No replies yet.</p>}
                    {isRepliesLoadedSuccessfully === false ? <p className="error">Replies could not be loaded.</p> : null}

                    {isReplyUpdatedSuccessfully === null
                        ? null
                        : isReplyUpdatedSuccessfully === true
                            ? <p className="success" id="update-reply-success-message">Reply was updated.</p>
                            : <p className="error" id="update-reply-error-message">Reply could not be updated.</p>}

                    {isReplyDeletedSuccessfully === null
                        ? null
                        : isReplyDeletedSuccessfully === true
                            ? <p className="success" id="delete-reply-success-message">Reply was deleted.</p>
                            : <p className="error" id="delete-reply-error-message">Reply could not be deleted.</p>}

                    <div id="reply-cards">
                        {replies.map((reply) => {
                            return <ReplyCard
                                key={reply.reply_id}
                                reply={reply}
                                userLoggedIn={userLoggedIn}
                                setIsReplyUpdatedSuccessfully={setIsReplyUpdatedSuccessfully}
                                setIsReplyDeletedSuccessfully={setIsReplyDeletedSuccessfully}
                            />
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}