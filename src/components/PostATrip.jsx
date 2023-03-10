import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import * as api from "../api";

export default function PostATrip() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    
    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState("");
    const [arrivalDateInput, setArrivalDateInput] = useState("");
    const [departureDateInput, setDepartureDateInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [filteredCitiesToDisplay, setFilteredCitiesToDisplay] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [isArrivaleDateTheSameAsOrAfterTodaysDate, setIsArrivalDateTheSameAsOrAfterTodaysDate] = useState(null);
    const [isDepartureDateAfterTodaysDate, setIsDepartureDateAfterTodaysDate] = useState(null);
    const [isDepartureDateAfterArrivalDate, setIsDepartureDateAfterArrivalDate] = useState(null);
    const [wasPostCreated, setWasPostCreated] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in")
        }
    }, [])

    useEffect(() => {
        api.getWorldCities()
            .then((response) => {
                setCities(response);
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        setWasPostCreated(null);
        api.createPost(new Date(), selectedCity, arrivalDateInput, departureDateInput, descriptionInput, userLoggedIn.user_id)
            .then((response) => {
                setWasPostCreated(true);
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
                setWasPostCreated(false);
            })
    }

    function onChangeCityInput(event) {
        setCityInput(event.target.value);
        const cityInputInLowercase = event.target.value.toLowerCase();
        if (event.target.value.length > 0) {
            const releventCities = cities.filter((city) => {
                return city.name.toLowerCase().includes(cityInputInLowercase);
            })
            const releventCitiesFirst5 = [];
            if (releventCities.length > 5) {
                for (let i = 0; i < 5; i++) {
                    releventCitiesFirst5.push(releventCities[i]);
                }
            } else {
                for (let i = 0; i < releventCities.length; i++) {
                    releventCitiesFirst5.push(releventCities[i]);
                }
            }
            setFilteredCitiesToDisplay(releventCitiesFirst5);
        } else {
            setFilteredCitiesToDisplay([]);
        }
    }

    function onClickCity(event) {
        setSelectedCity(event.target.innerText);
        setCityInput(event.target.innerText);
        setFilteredCitiesToDisplay([]);
    }

    function onChangeArrivalDate(event) {
        setIsArrivalDateTheSameAsOrAfterTodaysDate(null);
        setIsDepartureDateAfterArrivalDate(null);
        const arrivalDateAsString = new Date(event.target.value).toLocaleDateString();
        setArrivalDateInput(arrivalDateAsString);
        if (new Date().toLocaleDateString() <= arrivalDateAsString) {
            setIsArrivalDateTheSameAsOrAfterTodaysDate(true);
        } else {
            setIsArrivalDateTheSameAsOrAfterTodaysDate(false);
        }
        if (departureDateInput) {
            if (departureDateInput > arrivalDateAsString) {
                setIsDepartureDateAfterArrivalDate(true);
            } else {
                setIsDepartureDateAfterArrivalDate(false);
            }
        }
    }

    function onChangeDepartureDate(event) {
        setIsDepartureDateAfterTodaysDate(null);
        setIsDepartureDateAfterArrivalDate(null);
        const departureDateAsString = new Date(event.target.value).toLocaleDateString();
        setDepartureDateInput(departureDateAsString);
        if (new Date().toLocaleDateString() < departureDateAsString) {
            setIsDepartureDateAfterTodaysDate(true);
        } else {
            setIsDepartureDateAfterTodaysDate(false);
        }
        if (arrivalDateInput) {
            if (arrivalDateInput < departureDateAsString) {
                setIsDepartureDateAfterArrivalDate(true);
            } else {
                setIsDepartureDateAfterArrivalDate(false);
            }
        }
    }

    function onChangeDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <main>
            <h1>Post a Trip</h1>
            
            {isArrivaleDateTheSameAsOrAfterTodaysDate === null || isArrivaleDateTheSameAsOrAfterTodaysDate === true
                ? null
                : <p className="error">Please enter an arrival date that is the same as or after today's date.</p>}

            {isDepartureDateAfterTodaysDate === null || isDepartureDateAfterTodaysDate === true
                ? null
                : <p className="error">Please enter a departure date that is after today's date.</p>}
            
            {isDepartureDateAfterArrivalDate === null || isDepartureDateAfterArrivalDate === true
                ? null
                : <p className="error">Please enter a departure date that is after your arrival date.</p>}

            {wasPostCreated === null
                ? null
                : wasPostCreated === true
                    ? <p className="success">Post was created successfully!</p>
                    : <p className="error">Post could not be created.</p>}

            <form onSubmit={handleSubmit}>
                <div id="post-a-trip-filtered-cities">
                    {filteredCitiesToDisplay.map((city) => {
                        return <div onClick={onClickCity} key={city.geonameid}>{city?.name}, {city?.subcountry}, {city?.country}</div>
                    })}
                </div>

                <label htmlFor="post-a-trip-city">Where are you going?</label>
                <input
                    type="text"
                    id="post-a-trip-city"
                    name="post-a-trip-city"
                    onChange={onChangeCityInput}
                    value={cityInput}
                ></input>

                

                <label htmlFor="post-a-trip-arrival-date">Arrival date:</label>
                <input
                    type="date"
                    id="post-a-trip-arrival-date"
                    name="post-a-trip-arrival-date"
                    onChange={onChangeArrivalDate}
                ></input>

                <label htmlFor="post-a-trip-departure-date">Departure date:</label>
                <input
                    type="date"
                    id="post-a-trip-departure-date"
                    name="post-a-trip-departure-date"
                    onChange={onChangeDepartureDate}
                ></input>

                <label htmlFor="post-a-trip-departure-description">Tell others about your trip:</label>
                <textarea
                    id="post-a-trip-departure-description"
                    name="post-a-trip-departure-description"
                    onChange={onChangeDescriptionInput}
                    value={descriptionInput}
                ></textarea>

                <input type="submit" value="Post Your Trip" disabled={Object.keys(selectedCity).length === 0 || !arrivalDateInput || !departureDateInput || !isDepartureDateAfterArrivalDate || !descriptionInput || !isArrivaleDateTheSameAsOrAfterTodaysDate}></input>
            </form>
        </main>
    )
}