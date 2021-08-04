<template>
    <div class="login-container">
        <div class="login-card card">
            <div class="form login-card-content" @submit="handleLogin">
                <div class="login-header">
                    Log In
                </div>
                <form class="login-form-container">

                    <b-field class="login-form-item form-group" label="Email"
                        type="is-primary"
                        message="">
                        <b-input
                            v-model="email"
                            type="email"
                            required
                        >
                        </b-input>
                    </b-field>

                    <b-field class="login-form-item form-group" label="Password"
                        type="is-primary">
                        <b-input
                            v-model="password"
                            type="password"
                            required
                        >
                        </b-input>
                    </b-field>

                    <b-button @click.prevent="formCheck" class="is-info" expanded>
                        Log In
                    </b-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data: function() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        formCheck() {
            if (this.email && this.password) {
                this.handleLogin();
            }
            else {
                this.$buefy.snackbar.open({
                    message: 'Please enter your credentials!',
                    type: 'is-info',
                    position: 'is-top'
                });
            }
        },
        handleLogin() {
            this.$store.dispatch('auth/login', {
                email: this.email, 
                password: this.password
            })
            .then(data => {
                this.$buefy.snackbar.open({
                    message: 'Welcome back!',
                    type: 'is-info',
                    position: 'is-bottom'
                });
            }),
            error => {
                console.log("Login Error: ", error);
            }
        }
    }
};

</script>

<style>

.card {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.login-card {
    min-width: 450px;
}

.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
}

.login-card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 40px 0;
}

.login-header {
    font-size: 25pt;
    font-family: Rubik, Roboto;
    margin-bottom: 10px;
}

.login-form-container {
    width: 300px;
}

.login-form-item {
    width: 300px;
}

.login-form-submit-button {
    /*min-width: 300px;*/
    margin-top: 20px;
    margin-bottom: 20px;
}


</style>
