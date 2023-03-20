import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate, Link } from "react-router-dom";
import imageCoupleOnADate from "../assets/images/romantic-couple-dating-restaurant-picture-pub-149604565.jpg";

export default function Index() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/home");
        }
    }, [])

    return (
        <div className="main index">
            <main>
                <section id="index-hero">
                    <div id="index-hero-body">
                        <h1>Find a fake date for any social occasion</h1>
                        <Link to="/sign-up">
                            <button>Join Today</button>
                        </Link>
                        <div id="index-hero-image-credit">Photo: <a href="https://unsplash.com/@brookecagle" target="_blank">Brooke Cagle</a></div>
                    </div>
                </section>

                <section id="index-intro">
                    <div>
                        <h2>Need a date soon?</h2>
                        <p>If you have a social occasion coming up but don't want to go alone, browse our app to find someone to go with.</p>
                        <p>Whether it's a wedding, birthday party, or just a night out with friends, you'll find a great fake date to keep you company whatever the occasion.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}