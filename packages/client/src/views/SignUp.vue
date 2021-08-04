<template>
    <div class="signup-container">
        <div class="signup-card card">
            <div class="signup-card-content">
                <div class="signup-header">
                    Sign Up
                </div>
                <form class="signup-form-container">
                    <b-field class="signup-form-item" label="Name">
                        <b-input required v-model="name"></b-input>
                    </b-field>

                    <b-field class="signup-form-item" label="Email"
                        type="is-primary">
                        <b-input required v-model="email" type="email" maxlength="30">
                        </b-input>
                    </b-field>

                    <b-field 
                        class="signup-form-item" 
                        label="Password"
                        type="is-primary"
                        required
                    >
                        <b-input
                            required
                            v-model="password" 
                            value="123" 
                            type="password" 
                            maxlength="30">
                        </b-input>
                    </b-field>

                    <b-field class="signup-form-item" label="Default Currency">
                        <b-select 
                            v-model="defaultCurrency" 
                            placeholder="Select default currency" 
                            expanded
                            required
                        >
                            <option value=INR>INR</option>
                            <option value=USD>USD</option>
                            <option value=CAD>CAD</option>
                            <option value=EUR>USD</option>
                            <option value=AED>AED</option>
                        </b-select>
                    </b-field>

                    <b-button
                        @click.prevent="checkForm" 
                        class="is-info" 
                        expanded
                    >
                        Sign Up
                    </b-button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>

.card {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.signup-card {
    min-width: 450px;
}

.signup-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: 15px;
}

.signup-card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0 20px 0;
}

.signup-header {
    font-size: 25pt;
    font-family: Rubik, Roboto;
    margin-bottom: 10px;
}

.signup-form-container {
    width: 300px;
}

.signup-form-item {
    width: 300px;
}

.signup-form-submit-button {
    margin-top: 20px;
    margin-bottom: 20px;
}


</style>

<script>
import router from 'vue-router';

export default {
    name: 'SignUp',
    data: function() {
        return {
            name: null,
            email: null,
            password: null,
            defaultCurrency: null,
            errors: true
        }
    },
    methods: {
        checkForm() {
            if (this.name && this.email && this.password && this.defaultCurrency) {
                this.error = false;
                this.handleSignup();
            }
            else {
                this.error = true;
                this.$buefy.snackbar.open({
                    message: 'Please fill the required fields!',
                    type: 'is-danger',
                    position: 'is-bottom'
                });
            }

        },
        handleSignup() {
            this.$store.dispatch('auth/signup', {
                name: this.name,
                email: this.email, 
                password: this.password,
                defaultCurrency: this.defaultCurrency
            })
            .then(data => {
                this.$buefy.snackbar.open({
                    message: 'Welcome!',
                    type: 'is-info',
                    position: 'is-top'
                });
                router.push("/dashboard");
            }),
            error => {
                console.log("Signup error: ", error);
            }
        }
    }
};

</script>