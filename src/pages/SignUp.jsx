import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api";
import Gender from "../components/Gender";
import Avatar from "../components/Avatar";
import Password from "../components/Password";

export default function SignUp({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUsersSuccessful, setIsLoadingUsersSuccessful] = useState(null);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInputLabel, setPasswordInputLabel] = useState("Password: ");
    const [genderInput, setGenderInput] = useState("default");
    const [avatarUrlInput, setAvatarUrlInput] = useState("");
    const [isUsernameTaken, setIsUsernameTaken] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(null);
    const [isUserAddedSuccessfully, setIsUserAddedSuccessfully] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/home");
        }
    }, [])

    useEffect(() => {
        setIsLoading(true);
        setIsLoadingUsersSuccessful(null);
        api.getUsers()
            .then((response) => {
                setIsLoading(false);
                setIsLoadingUsersSuccessful(true);
                setUsers(response);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsLoadingUsersSuccessful(false);
            })
    }, [])

    function createAccount(username, password, gender, avatarUrl) {
        api.addUser(username, password, gender, avatarUrl, new Date())
            .then((response) => {
                setUserLoggedIn(response);
                setIsUserAddedSuccessfully(true);
                navigate("/home");
            })
            .catch((error) => {
                setIsUserAddedSuccessfully(false);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
        setIsUsernameTaken(null);
        setIsUsernameValid(null);
        const usernameInputInLowercase = event.target.value.toLowerCase();        
        if (usernameInputInLowercase.length > 0) {
            const usernameIsValid = /^[a-z]+[0-9]*$/.test(usernameInputInLowercase);
            if (usernameIsValid) {
                setIsUsernameValid(true);
                const isUsernameRegistered = users.some((user) => {
                    return user.username.toLowerCase() === usernameInputInLowercase;
                })
                setIsUsernameTaken(isUsernameRegistered);
            } else {
                setIsUsernameValid(false);
            }
        } else {
            setIsUsernameTaken(null);
        }
    }

    function onClickSignUpButton() {
        setIsAvatarUrlValid(null);
        setIsUserAddedSuccessfully(null);
        if (avatarUrlInput.length > 0) {
            const avatarUrlIsValid = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(avatarUrlInput);
            if (avatarUrlIsValid) {
                setIsAvatarUrlValid(true);
                createAccount(usernameInput, passwordInput, genderInput, avatarUrlInput);
            } else {
                setIsAvatarUrlValid(false);
            }
        } else {
            setIsAvatarUrlValid(true);
            createAccount(usernameInput, passwordInput, genderInput, "http://cdn.onlinewebfonts.com/svg/img_258083.png");
        }
    }

    if (isLoading) {
        return (
            <div className="main">
                <main>
                    <p>Loading...</p>
                </main>
            </div>
        )
    }

    if (isLoadingUsersSuccessful === false) {
        return (
            <div className="main">
                <main>
                    <p>Could not connect to the server. Please try again later.</p>
                </main>
            </div>
        )
    }

    return (
        <div className="main">
            <main>
                <h1>Sign Up</h1>
                <p>Create an account to find someone to go on a fake date with.</p>
                <p>Already have an account? <Link to="/sign-in" id="sign-in-link">Sign in</Link>.</p>

                {isUserAddedSuccessfully === false
                    ? <p className="error">Account could not be created. Try again later.</p>
                    : null}

                {isUsernameValid === null || isUsernameValid === true
                    ? null
                    : <p className="error">Usernames must start with a letter and can only contain alphanumeric characters.</p>}
                
                {isAvatarUrlValid === false
                    ? <p className="error">Please enter a valid image URL.</p>
                    : null}

                <form onSubmit={handleSubmit} id="sign-up-form">
                    <div id="sign-up-form-username-label-input-and-message">
                        <label htmlFor="username-input">Username:</label>
                        <div id="sign-up-form-username-input-and-message">
                            <input
                                type="text"
                                id="username-input"
                                name="username-input"
                                maxLength="20"
                                value={usernameInput}
                                onChange={handleUsernameInput}
                            ></input>
                            {isUsernameTaken === null
                                ? null
                                : isUsernameTaken === true
                                    ? <span className="error">Unavailable</span>
                                    : <span className="success">Available</span>}
                        </div>
                    </div>
                    
                    <Password passwordInput={passwordInput} setPasswordInput={setPasswordInput} passwordInputLabel={passwordInputLabel}/>

                    <Gender genderInput={genderInput} setGenderInput={setGenderInput}/>

                    <Avatar avatarUrlInput={avatarUrlInput} setAvatarUrlInput={setAvatarUrlInput} setIsAvatarUrlValid={setIsAvatarUrlValid}/>

                    <div>
                        <button onClick={onClickSignUpButton} disabled={!usernameInput || !passwordInput || isUsernameTaken || !isUsernameValid || genderInput === "default"}>Sign Up</button>
                    </div>
                </form>
            </main>
        </div>
    )
}