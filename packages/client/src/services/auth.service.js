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
            localStorage.setItem('userToken', JSON.stringify(response.data.token));
        }
        return response.data
    }, error => {
        //For now, this is fine.
        console.log(error)
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
            localStorage.setItem('userToken', JSON.stringify(response.data.token));
        }
        return response.data
    }, error => {
        console.log(error)
    });
}