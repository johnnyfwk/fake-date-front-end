import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Cities from "../components/Cities";
import DateOfDate from "../components/DateOfDate";
import GenderOfDate from "../components/GenderOfDate";
import Occasion from "../components/Occasion";
import Description from "../components/Description";
import * as api from "../api";

export default function CreatePost() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [titleInput, setTitleInput] = useState("");
    const [cityInput, setCityInput] = useState("default");
    const [genderOfDateInput, setGenderOfDateInput] = useState("default");
    const [dateInput, setDateInput] = useState("");
    const [isDateValid, setIsDateValid] = useState(null);
    const [occasionInput, setOccasionInput] = useState("default");
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
        api.createPost(new Date(), new Date(), titleInput, cityInput, genderOfDateInput, dateInput, occasionInput, descriptionInput, userLoggedIn.user_id)
            .then((response) => {
                setIsPostCreatedSuccessfully(true);
                setTimeout(() => navigate("/home"), 3000);
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
                    ? <p className="success">Your post was created.</p>
                    : <p className="error">Post could not be created. Please try again later.</p>}

            <form onSubmit={handleSubmit}>
                <Title titleInput={titleInput} setTitleInput={setTitleInput} />
                <GenderOfDate genderOfDateInput={genderOfDateInput} setGenderOfDateInput={setGenderOfDateInput} />
                <Cities cityInput={cityInput} setCityInput={setCityInput} />
                <Occasion occasionInput={occasionInput} setOccasionInput={setOccasionInput} />            
                <DateOfDate dateInput={dateInput} setDateInput={setDateInput} setIsDateValid={setIsDateValid} />                
                <Description descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}/>
                <input
                    type="submit"
                    value="Submit"
                    disabled={
                        !titleInput ||
                        !cityInput ||
                        !genderOfDateInput ||
                        !dateInput ||
                        !isDateValid ||
                        !occasionInput ||
                        !descriptionInput ||
                        isPostCreatedSuccessfully
                    }
                ></input>
            </form>
        </main>
    )
}