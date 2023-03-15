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
                console.log(error);
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
                console.log(error);
                setIsUserAddedSuccessfully(false);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
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

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isLoadingUsersSuccessful === false) {
        return <p className="error">Could not connect to the server. Please try again later.</p>
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>Create an account to find someone to go on a fake date with.</p>
            <p>Already have an account? <Link to="/sign-in">Sign in</Link>.</p>

            {isUserAddedSuccessfully === false
                ? <p className="error">Account could not be created. Try again later.</p>
                : null}

            <form onSubmit={handleSubmit}>
                <label htmlFor="sign-up-username">Username:</label>
                <input
                    type="text"
                    id="sign-up-username"
                    name="sign-up-username"
                    maxLength="20"
                    onChange={handleUsernameInput}
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

                <Password passwordInput={passwordInput} setPasswordInput={setPasswordInput} passwordInputLabel={passwordInputLabel}/>

                <Gender genderInput={genderInput} setGenderInput={setGenderInput}/>

                <Avatar avatarUrlInput={avatarUrlInput} setAvatarUrlInput={setAvatarUrlInput} setIsAvatarUrlValid={setIsAvatarUrlValid}/>

                {isAvatarUrlValid === false
                    ? <span className="error">Please enter a valid image URL.</span>
                    : null}

                <input type="submit" value="Create Account" disabled={!usernameInput || !passwordInput || isUsernameTaken || !isUsernameValid || genderInput === "default"}></input>
            </form>
        </main>
    )
}