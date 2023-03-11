import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import Cities from "../components/Cities";
import DateOfDate from "../components/DateOfDate";
import Gender from "../components/Gender";
import Occasion from "../components/Occasion";
import Description from "../components/Description";

export default function CreatePost() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [cityInput, setCityInput] = useState("");
    const [genderInput, setGenderInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [isDateValid, setIsDateValid] = useState(null);
    const [occasionInput, setOccasionInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in")
        }
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        console.log(new Date());
        console.log(cityInput, "<------- cityInput");
        console.log(genderInput, "<------- genderInput");
        console.log(dateInput, "<------- dateInput");
        console.log(occasionInput, "<------- occasionInput");
        console.log(descriptionInput, "<------- descriptionInput");
    }

    return (
        <main>
            <h1>Find a Fake Date</h1>
            <p>Enter where and when it will happen, who you are looking for, what the occasion will be, and additional information about why  you are looking for a fake date.</p>

            {isDateValid === null || isDateValid === true
                ? null
                : <p className="error">Please select a date that is the same as or after today's date.</p>}

            <form onSubmit={handleSubmit}>
                <Cities setCityInput={setCityInput} />
                <Gender setGenderInput={setGenderInput} />
                <DateOfDate setDateInput={setDateInput} setIsDateValid={setIsDateValid} />
                <Occasion setOccasionInput={setOccasionInput} />
                <Description setDescriptionInput={setDescriptionInput}/>
                <input type="submit" value="Submit" disabled={!cityInput || !genderInput || !dateInput || !isDateValid || !occasionInput || !descriptionInput}></input>
            </form>
        </main>
    )
}