import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate, Link } from "react-router-dom";
import * as api from "../api";

export default function LogIn({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
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
        api.getUsers()
            .then((response) => {
                setIsLoading(false);
                setUsers(response);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
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

    function onChangeUsernameInput(event) {
        setUsernameInput(event.target.value)
    }

    function onChangePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h1>Sign In</h1>
            <p>Log into your account. Don't have an account? <Link to="/sign-up">Sign up</Link>.</p>

            {isUsernameInDatabase === null || isUsernameInDatabase === true
                ? null
                : <p className="error">Username does not exist</p>}

            {isPasswordCorrect === null || isPasswordCorrect === true
                ? null
                : <p className="error">Password is incorrect</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="sign-in-username">Username:</label>
                <input
                    type="text"
                    id="sign-in-username"
                    name="sign-in-username"
                    maxLength="20"
                    onChange={onChangeUsernameInput}
                    value={usernameInput}
                ></input>

                <label htmlFor="sign-in-password">Password:</label>
                <input
                    type="password"
                    id="sign-in-password"
                    name="sign-in-password"
                    onChange={onChangePasswordInput}
                    value={passwordInput}
                ></input>

                <input type="submit" value="Log In" disabled={!usernameInput || !passwordInput}></input>
            </form>
        </main>
    )
}