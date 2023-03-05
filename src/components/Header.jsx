import { useAuth0 } from "@auth0/auth0-react";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";

export default function Header() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <header>
            <div>Cotraveller</div>
            {isAuthenticated ? <LogOutButton /> : <LogInButton />}           
        </header>
    )
}