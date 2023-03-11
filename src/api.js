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

export function addUser(username, password, gender, avatar_url, join_date) {
    return baseUrl
        .post("/users", {username, password, gender, avatar_url, join_date})
        .then((response) => {
            return response.data.user;
        })
}

export function getPosts() {
    return baseUrl
        .get("/posts")
        .then((response) => {
            return response.data.posts;
        })
}

export function createPost(post_date, destination, arrival_date, departure_date, description, user_id) {
    return baseUrl
        .post("/posts", {post_date, destination, arrival_date, departure_date, description, user_id})
        .then((response) => {
            return response.data.post;
        })
}

export function getWorldCities() {
    const options = {
        method: "GET",
        url: "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    };

    return axios
        .request(options)
        .then((response) => {
            return response.data;
        })
}