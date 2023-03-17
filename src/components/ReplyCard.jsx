import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

export default function ReplyCard({reply, userLoggedIn, setIsReplyUpdatedSuccessfully, setIsReplyDeletedSuccessfully}) {
    const [isEditReplyButtonVisible, setIsEditReplyButtonVisible] = useState(true);
    const [isDeleteReplyButtonVisible, setIsDeleteReplyButtonVisible] = useState(true);
    const [isCancelEditReplyButtonVisible, setIsCancelEditReplyButtonVisible] = useState(false);
    const [isUpdateReplyButtonVisible, setIsUpdateReplyButtonVisible] = useState(false);
    const [isEditReplyInputVisible, setIsEditReplyInputVisible] = useState(false);
    const [areDeleteReplyConfirmationButtonsVisible, setAreDeleteReplyConfirmationButtonsVisible] = useState(false);
    const [editReplyInput, setEditReplyInput] = useState("");
    
    function onClickEditReplyButton() {
        setIsEditReplyButtonVisible(false);
        setIsDeleteReplyButtonVisible(false);
        setAreDeleteReplyConfirmationButtonsVisible(false);
        setIsEditReplyInputVisible(true);
        setIsCancelEditReplyButtonVisible(true);
        setIsUpdateReplyButtonVisible(true);
        setEditReplyInput(reply.reply);
    }

    function onClickDeleteReplyButton() {
        setIsEditReplyButtonVisible(false);
        setIsDeleteReplyButtonVisible(false);
        setAreDeleteReplyConfirmationButtonsVisible(true);
        setIsEditReplyInputVisible(false);
        setIsCancelEditReplyButtonVisible(false);
        setIsUpdateReplyButtonVisible(false);
    }

    function onClickDeleteReplyNo() {
        setIsEditReplyButtonVisible(true);
        setIsDeleteReplyButtonVisible(true);
        setAreDeleteReplyConfirmationButtonsVisible(false);
        setIsEditReplyInputVisible(false);
        setIsCancelEditReplyButtonVisible(false);
        setIsUpdateReplyButtonVisible(false);
    }

    function onClickDeleteReplyYes() {
        setIsEditReplyButtonVisible(true);
        setIsDeleteReplyButtonVisible(true);
        setAreDeleteReplyConfirmationButtonsVisible(false);
        setIsEditReplyInputVisible(false);
        setIsCancelEditReplyButtonVisible(false);
        setIsUpdateReplyButtonVisible(false);
        setIsReplyDeletedSuccessfully(null);
        api.deleteReplyById(reply.reply_id)
            .then((response) => {
                setIsReplyDeletedSuccessfully(true);
                setTimeout(() => setIsReplyDeletedSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsReplyDeletedSuccessfully(false);
                setTimeout(() => setIsReplyDeletedSuccessfully(null), 3000);
            })
    }

    function onClickCancelEditReplyButton() {
        setIsEditReplyButtonVisible(true);
        setIsDeleteReplyButtonVisible(true);
        setAreDeleteReplyConfirmationButtonsVisible(false);
        setIsEditReplyInputVisible(false);
        setIsCancelEditReplyButtonVisible(false);
        setIsUpdateReplyButtonVisible(false);
    }

    function onClickUpdateReplyButton() {
        setIsEditReplyButtonVisible(true);
        setIsDeleteReplyButtonVisible(true);
        setAreDeleteReplyConfirmationButtonsVisible(false);
        setIsEditReplyInputVisible(false);
        setIsCancelEditReplyButtonVisible(false);
        setIsUpdateReplyButtonVisible(false);
        setIsReplyUpdatedSuccessfully(null);
        api.editReplyById(reply.reply_id, editReplyInput)
            .then((response) => {
                setIsReplyUpdatedSuccessfully(true);
                setTimeout(() => setIsReplyUpdatedSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsReplyUpdatedSuccessfully(false);
                setTimeout(() => setIsReplyUpdatedSuccessfully(null), 3000);
            })
    }

    function onChangeEditReplyInput(event) {
        setEditReplyInput(event.target.value);
    }

    return (
        <div id="reply-card">
            <Link to={`/profile/${reply.user_id}`} id="reply-card-avatar" title={reply.username}>
                <img src={reply.avatar_url} alt={reply.avatar_url}></img>
            </Link>

            <div id="reply-card-body-and-buttons">
                <div id="reply-card-body">
                    {window.location.href.includes("profile")
                        ? <div><Link to={`/posts/${reply.post_id}`} id="reply-card-title">{reply.title}</Link></div>
                        : null}

                    <div id="reply-card-username-time-and-date">
                        <b>{reply.username}</b>
                        <div id="reply-card-time-and-date">
                            <div>{new Date(reply.reply_date).toLocaleTimeString()}</div>
                            <div>{new Date(reply.reply_date).toLocaleDateString()}</div>
                        </div>
                    </div>
                    
                    {isEditReplyInputVisible
                        ? <textarea
                            value={editReplyInput}
                            onChange={onChangeEditReplyInput}
                        ></textarea>
                        : <div id="reply-card-reply">{reply.reply}</div>}              
                </div>

                <div id="reply-card-buttons">
                    {userLoggedIn?.user_id === reply.user_id && isEditReplyButtonVisible
                        ? <button onClick={onClickEditReplyButton}>Edit</button>
                        : null}

                    {userLoggedIn?.user_id === reply.user_id && isCancelEditReplyButtonVisible
                        ? <button onClick={onClickCancelEditReplyButton}>Cancel</button>
                        : null}

                    {userLoggedIn?.user_id === reply.user_id && isUpdateReplyButtonVisible
                        ? <button onClick={onClickUpdateReplyButton} disabled={!editReplyInput}>Update</button>
                        : null}
                    
                    {userLoggedIn?.user_id === reply.user_id && isDeleteReplyButtonVisible
                        ? <button onClick={onClickDeleteReplyButton}>Delete</button>
                        : null}
                    
                    {userLoggedIn?.user_id === reply.user_id && areDeleteReplyConfirmationButtonsVisible
                        ? <div>
                            <span className="confirm">Delete reply?</span>
                            <button onClick={onClickDeleteReplyNo}>No</button>
                            <button onClick={onClickDeleteReplyYes}>Yes</button>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}