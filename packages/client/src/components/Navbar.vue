<template>
    <b-navbar class="main-navbar">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <span class="app-logo">ExpenseMan</span>
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
                <!-- <router-link label="Home" :to="{ name: 'Home'}" >Home</router-link> -->
                Dashboard
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/expenses' }">
                Expenses
            </b-navbar-item>
            <b-navbar-item href="#">
                Reports
            </b-navbar-item>
        </template>

        <template #end>
            <!-- <span>{{}}</span> -->
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button 
                        v-if="!loggedIn" 
                        class="button is-primary" 
                        tag="router-link" to="/signup"
                    >
                        <strong>Sign up</strong>
                    </b-button>
                    <b-button 
                        v-if="!loggedIn" 
                        class="is-primary is-light" 
                        tag="router-link" to="/login"
                    >
                        Log In
                    </b-button>
                    <b-button 
                        v-if="loggedIn"
                        @click="handleLogOut"
                        class="is-primary is-light"
                    >
                        Log Out
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
        <router-view/>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'navbar',
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        }
    },
    methods: {
        handleLogOut() {
            this.$store.dispatch('auth/logout');
        }
    }
}

</script>

<style>

.main-navbar {
    position: sticky;
    top: 0;
}

.app-logo {
    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 1.4rem;
}
</style>