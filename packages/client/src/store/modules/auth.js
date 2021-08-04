import axios from 'axios';
import router from '../../router';
import { authService } from '../../services/auth.service';

function parseJwt (token) {
    if (!token) {
        return false
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Resolve this
const user = parseJwt(localStorage.getItem('userToken'));

const state = user
  ? { loggedIn: true , user }
  : { loggedIn: false, user: null };


const getters = {
    user: state => state.user,
}

const actions = {
    login({commit}, args) {
        return authService.login(args.email, args.password).then(
            user => {
                commit("loginSuccess", user);
                router.push("/dashboard")
                return Promise.resolve(user);
            },
            error => {
                commit("loginFail");
                return Promise.reject(error);
            }
        )
    },
    signup({commit}, args) {
        return authService.signup({
            name: args.name,
            email: args.email,
            password: args.password,
            default_currency: args.defaultCurrency
        }).then(
            user => {
                commit("signupSuccess", user);
                router.push("/dashboard");
                return Promise.resolve(user);
            },
            error => {
                commit("signupFail");
                return Promise.reject(error);
            }
        )
    },
    logout({commit}) {
        authService.logout();
        commit("logoutUser");
    }
}

const mutations = {
    loginSuccess(state, user) {
        state.loggedIn = true;
        state.user = user;
    },
    loginFail(state) {
        state.loggedIn = false;
        state.user = null;
    },
    logoutUser(state) {
        state.loggedIn = false;
        state.user = null;
    },
    signupSuccess(state, user) {
        state.loggedIn = true;
        state.user = user;
    },
    signupFail(state, user) {
        state.loggedIn = false;
        state.user = null;
    }

}

export default {
    namespaced: true,
    state: state,
    getters,
    actions,
    mutations
}