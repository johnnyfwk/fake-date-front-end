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