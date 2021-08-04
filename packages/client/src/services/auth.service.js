import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'

export const authService = {
    login,
    logout,
    signup
}

function login(email, password) {
    return axios.post(`${API_URL}/login`, {
        email: email,
        password: password
    })
    .then(response => {
        if (response.data.token) {
            console.log(typeof(response.data.token))
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data
    }, error => {
        return error;
    });
}

function logout() {
    localStorage.removeItem("userToken");
}

function signup(user) {
    return axios.post(`${API_URL}/signup`, {
        ...user
    })
    .then(response => {
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data
    }, error => {
        console.log(error)
    });
}