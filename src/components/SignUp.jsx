import { useState, useEffect } from "react";
import * as api from "../api";

export default function SignUp({users, setUsers}) {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [avatarUrlInput, setAvatarUrlInput] = useState("");

    useEffect(() => {
        api.getUsers()
            .then((response) => {
                setUsers(response);
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        console.log(usernameInput, "<------- usernameInput");
        console.log(passwordInput, "<------- passwordInput");
        console.log(avatarUrlInput, "<------- avatarUrlInput");
    }

    function onChangeUsernameInput(event) {
        setUsernameInput(event.target.value);
    }

    function onChangePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    function onChangeAvatarUrlInput(event) {
        setAvatarUrlInput(event.target.value);
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>Create an account to find a travel partner.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="sign-up-username">Username:</label>
                <input
                    type="text"
                    id="sign-up-username"
                    name="sign-up-username"
                    maxLength="20"
                    onChange={onChangeUsernameInput}
                    value={usernameInput}
                ></input>

                <label htmlFor="sign-up-password">Password:</label>
                <input
                    type="password"
                    id="sign-up-password"
                    name="sign-up-password"
                    maxLength="20"
                    onChange={onChangePasswordInput}
                    value={passwordInput}
                ></input>

                <label htmlFor="sign-up-avatar-url">Avatar URL (optional):</label>
                <input
                    type="text"
                    id="sign-up-avatar-url"
                    name="sign-up-avatar-url"
                    onChange={onChangeAvatarUrlInput}
                    value={avatarUrlInput}
                ></input>

                <input type="submit" value="Sign Up"></input>
            </form>
        </main>
    )
}