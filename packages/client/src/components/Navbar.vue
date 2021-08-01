<template>
    <b-navbar>
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
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
        <router-view/>
    </b-navbar>
</template>

<script>

export default {
    name: 'navbar'
}

</script>

<style>
.app-logo {
    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 1.4rem;
}
</style>