import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://localhost:9090/api"
});

export function getUsers() {
    return baseUrl
        .get("/users")
        .then((response) => {
            return response.data.users;
        })
}

export function addUser(username, password, avatar_url, join_date) {
    return baseUrl
        .post("/users", {username, password, avatar_url, join_date})
        .then((response) => {
            return response.data.user;
        })
}