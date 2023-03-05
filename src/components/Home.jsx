import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <main>
            <h1>Home</h1>
            <p>Hi {user?.nickname}. Browse the app to find a travel buddy.</p>
        </main>
    )
}