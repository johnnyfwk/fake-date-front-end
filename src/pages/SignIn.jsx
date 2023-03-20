import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api";
import Password from "../components/Password";

export default function LogIn({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUsersSuccessful, setIsLoadingUsersSuccessful] = useState(null);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInputLabel, setPasswordInputLabel] = useState("Password: ");
    const [isUsernameInDatabase, setIsUsernameInDatabase] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);

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

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onChangeUsernameInput(event) {
        setUsernameInput(event.target.value)
    }

    function onClickSignInButton() {
        setIsUsernameInDatabase(null);
        setIsPasswordCorrect(null);
        const usernameInLowercase = usernameInput.toLowerCase();
        const user = users.filter((user) => {
            return user.username === usernameInLowercase;
        })
        if (user.length > 0) {
            if (user[0].password === passwordInput) {
                setIsPasswordCorrect(true);
                setUserLoggedIn(user[0]);
                navigate("/home");
            } else {
                setIsPasswordCorrect(false);
            }
        } else {
            setIsUsernameInDatabase(false);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isLoadingUsersSuccessful === false) {
        return (
            <div id="main">
                <main>
                    <p>Could not connect to the server. Please try again later.</p>
                </main>
            </div>
        )
    }

    return (
        <div className="main">
            <main>
                <h1>Sign In</h1>
                <p>Log into your account. Don't have an account? <Link to="/sign-up" id="sign-up-link">Sign up</Link>.</p>

                {isUsernameInDatabase === null || isUsernameInDatabase === true
                    ? null
                    : <p className="error">Username does not exist</p>}

                {isPasswordCorrect === null || isPasswordCorrect === true
                    ? null
                    : <p className="error">Password is incorrect</p>}

                <form onSubmit={handleSubmit} id="sign-in-form">
                    <div id="sign-in-form-username-label-and-input">
                        <label htmlFor="sign-in-username">Username:</label>
                        <input
                            type="text"
                            id="sign-in-username"
                            name="sign-in-username"
                            maxLength="20"
                            onChange={onChangeUsernameInput}
                            value={usernameInput}
                        ></input>
                    </div>

                    <Password
                        passwordInput={passwordInput}
                        setPasswordInput={setPasswordInput}
                        passwordInputLabel={passwordInputLabel}
                    />

                    <div>
                        <button onClick={onClickSignInButton} disabled={!usernameInput || !passwordInput}>Sign In</button>
                    </div>
                </form>
            </main>
        </div>
    )
}