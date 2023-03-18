import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div id="main">
            <main>
                <h1>404</h1>
                <p>You must be lost because there is nothing here...apart from this slice of pizza &#127829; the last person who came here dropped on the floor. Help yourself to it; it's only been sitting there for 30 minutes.</p>
                <p>If you have an account, you can <Link to="/sign-in">sign-in.</Link></p>
                <p>Or if you're new here, you can <Link to="sign-up">sign-up</Link> and find yourself a fake date.</p>
            </main>
        </div>
    )
}