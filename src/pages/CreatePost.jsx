import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import Cities from "../components/Cities";
import DateOfDate from "../components/DateOfDate";
import Gender from "../components/Gender";
import Occasion from "../components/Occasion";
import Description from "../components/Description";
import * as api from "../api";

export default function CreatePost() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [cityInput, setCityInput] = useState("");
    const [genderOfDateInput, setGenderOfDateInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [isDateValid, setIsDateValid] = useState(null);
    const [occasionInput, setOccasionInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [isPostCreatedSuccessfully, setIsPostCreatedSuccessfully] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        setIsPostCreatedSuccessfully(null);
        api.createPost(new Date(), cityInput, genderOfDateInput, dateInput, occasionInput, descriptionInput, userLoggedIn.user_id)
            .then((response) => {
                setIsPostCreatedSuccessfully(true);
                navigate("/home");
            })
            .catch((error) => {
                setIsPostCreatedSuccessfully(false);
            })
    }

    return (
        <main>
            <h1>Find a Fake Date</h1>
            <p>Enter where and when it will happen, who you are looking for, what the occasion will be, and additional information about why  you are looking for a fake date.</p>

            {isDateValid === null || isDateValid === true
                ? null
                : <p className="error">Please select a date that is the same as or after today's date.</p>}
            
            {isPostCreatedSuccessfully === null
                ? null
                : isPostCreatedSuccessfully === true
                    ? <p className="success">Post was successfully created.</p>
                    : <p className="error">Post could not be created. Please try again later.</p>}

            <form onSubmit={handleSubmit}>
                <Cities setCityInput={setCityInput} />
                <Gender setGenderOfDateInput={setGenderOfDateInput} />
                <DateOfDate setDateInput={setDateInput} setIsDateValid={setIsDateValid} />
                <Occasion setOccasionInput={setOccasionInput} />
                <Description setDescriptionInput={setDescriptionInput}/>
                <input type="submit" value="Submit" disabled={!cityInput || !genderOfDateInput || !dateInput || !isDateValid || !occasionInput || !descriptionInput}></input>
            </form>
        </main>
    )
}