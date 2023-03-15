import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://localhost:9090/api"
});

///////////// GET
export function getUsers() {
    return baseUrl
        .get("/users")
        .then((response) => {
            return response.data.users;
        })
}

export function getUserById(userId) {
    return baseUrl
        .get(`/users/${userId}`)
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

export function getPostsByUserId(userId) {
    return baseUrl
        .get(`/users/${userId}/posts`)
        .then((response) => {
            return response.data.posts;
        })
}

export function getRepliesByPostId(postId) {
    return baseUrl
        .get(`/posts/${postId}/replies`)
        .then((response) => {
            return response.data.replies;
        })
}

export function getRepliesByUserId(userId) {
    return baseUrl
        .get(`/users/${userId}/replies`)
        .then((response) => {
            return response.data.replies;
        })
}
///////////// GET



///////////// POST
export function addUser(username, password, gender, avatar_url, join_date) {
    return baseUrl
        .post("/users", {username, password, gender, avatar_url, join_date})
        .then((response) => {
            return response.data.user;
        })
}

export function createPost(post_date, post_updated, title, city, gender_of_date, date, occasion, description, user_id) {
    return baseUrl
        .post("/posts", {post_date, post_updated, title, city, gender_of_date, date, occasion, description, user_id})
        .then((response) => {
            return response.data.post;
        })
}

export function replyToAPost(reply_date, reply, post_id, user_id) {
    return baseUrl
        .post("/replies", {reply_date, reply, post_id, user_id})
        .then((response) => {
            return response;
        })
}
///////////// POST



///////////// PATCH
export function editPostById(postId, post_updated, title, city, gender_of_date, date, occasion, description) {
    return baseUrl
        .patch(`/posts/${postId}`, {post_updated, title, city, gender_of_date, date, occasion, description})
        .then((response) => {
            return response;
        })
}

export function editReplyById(replyId, reply) {
    return baseUrl
        .patch(`/replies/${replyId}`, {reply})
        .then((response) => {
            return response;
        })
}

export function editUserById(userId, password, gender, avatar_url) {
    return baseUrl
        .patch(`/users/${userId}`, {password, gender, avatar_url})
        .then((response) => {
            return response;
        })
}
///////////// PATCH



///////////// DELETE
export function deleteReplyById(replyId) {
    return baseUrl
        .delete(`/replies/${replyId}`)
        .then((response) => {
            return response;
        })
}

export function deletePostById(postId) {
    return baseUrl
        .delete(`/posts/${postId}`)
        .then((response) => {
            return response;
        })
}

export function deleteRepliesByPostId(postId) {
    return baseUrl
        .delete(`/posts/${postId}/replies`)
        .then((response) => {
            return response;
        })
}

export function deleteRepliesByUserId(userId) {
    return baseUrl
        .delete(`/users/${userId}/replies`)
        .then((response) => {
            return response;
        })
}

export function deleteUserById(userId) {
    return baseUrl
        .delete(`/users/${userId}`)
        .then((response) => {
            return response;
        })
}
///////////// DELETE