<template>
    <div class="login-container">
        <div class="login-card card">
            <div class="form login-card-content" @submit="handleLogin">
                <div class="login-header">
                    Log In
                </div>
                <div class="login-form-container">

                    <b-field class="login-form-item form-group" label="Email"
                        type="is-primary"
                        message="">
                        <b-input
                            v-model="email"
                            type="email"
                            value="john@"
                        >
                        </b-input>
                    </b-field>

                    <b-field class="login-form-item form-group" label="Password"
                        type="is-primary">
                        <b-input
                            v-model="password"
                            type="password" 
                            maxlength="30"
                        >
                        </b-input>
                    </b-field>

                    <b-button @click.prevent="handleLogin" class="is-info" expanded>
                        Log In
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data: function() {
        return {
            email: 'mfaraazb@gmail.com',
            password: 'helloworld',
        }
    },
    methods: {
        handleLogin() {
            this.$store.dispatch('auth/login', {
                email: this.email, 
                password: this.password
            })
            .then(data => {
                
            }),
            error => {
                // console.log("VUEEEE: ", error);
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
    display: flex;           /* establish flex container */
    flex-direction: column;  /* make main axis vertical */
    justify-content: center; /* center items vertically, in this case */
    align-items: center;     /* center items horizontally, in this case */
    min-height: 100%;
}

.login-card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 20px 0;
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
