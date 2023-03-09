import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import * as api from "../api";

export default function SignUp({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [avatarUrlInput, setAvatarUrlInput] = useState("");
    const [isUsernameTaken, setIsUsernameTaken] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/home");
        }
    }, [])

    useEffect(() => {
        api.getUsers()
            .then((response) => {
                setUsers(response);
            })
    }, [])

    function createAccount(username, password, avatarUrl) {
        api.addUser(username, password, avatarUrl, new Date())
            .then((response) => {
                setUserLoggedIn(response);
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsAvatarUrlValid(true)
        console.log(usernameInput.toLowerCase(), "<------- usernameInput");
        console.log(passwordInput, "<------- passwordInput");
        console.log(avatarUrlInput, "<------- avatarUrlInput");

        if (avatarUrlInput.length > 0) {
            const avatarUrlIsValid = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(avatarUrlInput);
            if (avatarUrlIsValid) {
                console.log("Avatar URL is valid. Account can be created");
                setIsAvatarUrlValid(true);
                createAccount(usernameInput, passwordInput, avatarUrlInput);
            } else {
                console.log("Avatar URL is not valid. Account can't be created.");
                setIsAvatarUrlValid(false);
            }
        } else {
            setIsAvatarUrlValid(true);
            console.log("Avatar URL input is empty. Account can be created.");
            createAccount(usernameInput, passwordInput, "http://cdn.onlinewebfonts.com/svg/img_258083.png");
        }
    }

    function onChangeUsernameInput(event) {
        setUsernameInput(event.target.value);
        setIsUsernameTaken(null);
        setIsUsernameValid(null);
        const usernameInputInLowercase = event.target.value.toLowerCase();        
        if (usernameInputInLowercase.length > 0) {
            const usernameIsValid = /^[a-z]+[0-9]*$/.test(usernameInputInLowercase);
            if (usernameIsValid) {
                setIsUsernameValid(true);
                const isUsernameRegistered = users.some((user) => {
                    return user.username === usernameInputInLowercase;
                })
                setIsUsernameTaken(isUsernameRegistered);
            } else {
                setIsUsernameValid(false);
            }
            
        } else {
            setIsUsernameTaken(null);
        }
    }

    function onChangePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    function onChangeAvatarUrlInput(event) {
        setAvatarUrlInput(event.target.value);
    }

    console.log(userLoggedIn, "<------- userLoggedIn")

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
                {isUsernameValid === null || isUsernameValid === true
                    ? null
                    : <span className="error">Usernames must start with a letter and can only contain alphanumeric characters.</span>}
                {isUsernameTaken === null
                    ? null
                    : isUsernameTaken === true
                        ? <span className="error">Unavailable</span>
                        : <span className="success">Available</span>}

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
                {isAvatarUrlValid ? null : <span className="error">Please enter a valid image URL.</span>}

                <input type="submit" value="Create Account" disabled={!usernameInput || !passwordInput || isUsernameTaken || !isUsernameValid}></input>
            </form>
        </main>
    )
}