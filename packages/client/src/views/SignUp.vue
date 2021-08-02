<template>
    <div class="signup-container">
        <div class="signup-card card">
            <div class="signup-card-content">
                <div class="signup-header">
                    Sign Up
                </div>
                <div class="signup-form-container">
                    <b-field class="signup-form-item" label="Name">
                        <b-input v-model="name"></b-input>
                    </b-field>

                    <b-field class="signup-form-item" label="Email"
                        type="is-primary">
                        <b-input v-model="email" type="email" maxlength="30">
                        </b-input>
                    </b-field>

                    <b-field class="signup-form-item" label="Password"
                        type="is-primary"
                        >
                        <b-input v-model="password" value="123" type="password" maxlength="30">
                        </b-input>
                    </b-field>

                    <b-field class="signup-form-item" label="Default Currency"
                        message="You can select a different currency for every expense later on!">
                        <b-select 
                            v-model="defaultCurrency" 
                            placeholder="Select default currency" 
                            expanded
                        >
                            <option value=INR>INR</option>
                            <option value=USD>USD</option>
                        </b-select>
                    </b-field>

                    <b-button @click.prevent="handleSignup" class="is-info" expanded>
                        Sign Up
                    </b-button>
                </div>
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

export default {
    name: 'SignUp',
    data: function() {
        return {
            name: '',
            email: '',
            password: '',
            defaultCurrency: ''
        }
    },
    methods: {
        handleSignup() {
            this.$store.dispatch('auth/signup', {
                name: this.name,
                email: this.email, 
                password: this.password,
                defaultCurrency: this.defaultCurrency
            })
            .then(data => {
                router.push("/dashboard");
            }),
            error => {
                console.log("VUEEEE: ", error);
            }
        }
    }
};

</script>