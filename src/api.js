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

export function getPostById(postId) {
    return baseUrl
        .get(`/posts/${postId}`)
        .then((response) => {
            return response.data.post;
        })
}

export function createPost(post_date, title, city, gender_of_date, date, occasion, description, user_id) {
    return baseUrl
        .post("/posts", {post_date, title, city, gender_of_date, date, occasion, description, user_id})
        .then((response) => {
            return response.data.post;
        })
}

export function getRepliesByPostId(postId) {
    return baseUrl
        .get(`/posts/${postId}/replies`)
        .then((response) => {
            return response.data.replies;
        })
}

export function replyToAPost(reply_date, reply, post_id, user_id) {
    return baseUrl
        .post("/replies", {reply_date, reply, post_id, user_id})
        .then((response) => {
            return response;
        })
}

export function getPostsByUserId(userId) {
    return baseUrl
        .get(`/users/${userId}/posts`)
        .then((response) => {
            return response.data.posts;
        })
}

export function getRepliesByUserId(userId) {
    return baseUrl
        .get(`/users/${userId}/replies`)
        .then((response) => {
            return response.data.replies;
        })
}

export function editReplyById(replyId, reply) {
    return baseUrl
        .patch(`/replies/${replyId}`, {reply})
        .then((response) => {
            return response;
        })
}

export function deleteReplyById(replyId) {
    return baseUrl
        .delete(`/replies/${replyId}`)
        .then((response) => {
            return response;
        })
}

export function editPostById(postId, title, city, gender_of_date, date, occasion, description) {
    return baseUrl
        .patch(`/posts/${postId}`, {title, city, gender_of_date, date, occasion, description})
        .then((response) => {
            return response;
        })
}