<template>
    <div class="view-expenses">
        <div class="view-expenses-left">
            <div class="categories-container notification">
            <div class="title-category">Categories</div>
        </div>
        </div>
        <div class="view-expenses-right">
            <div class="expenses-container">
            <!-- <div class="title-expense">Expenses</div> -->
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon-pack="fas"
                        icon="search">
                    </b-input>
                </b-field>
                <div class="expense-tools-container">
                    <tag-input></tag-input>
                    <div class="expense-tools-buttons">
                        <b-button 
                            class="expense-tools-button" 
                            type="is-primary is-light"
                            icon-left="chevron-up"
                        >
                            Date
                        </b-button>
                        <b-button 
                            type="is-primary is-light"
                            icon-left="chevron-up"
                        >
                            Amount
                        </b-button>
                    </div>
                </div>
                <div class="expense-list-container">
                    <div class="tile is-ancestor expense-list">
                        <div class="tile is-parent is-vertical">
                            <div class="tile is-child box expense-card">
                                Mein terii
                            </div>
                            <div class="tile is-child box expense-card">
                                Helo world
                            </div>
                            <div class="tile is-child box expense-card">
                                Kutta paalu VueJS ke naam ka
                            </div>
                            <div class="tile is-child box expense-card">
                                Kutta paalu VueJS ke naam ka
                            </div>
                            <div class="tile is-child box expense-card">
                                Kutta paalu VueJS ke naam ka
                            </div>
                            <div class="tile is-child box expense-card">
                                Kutta paalu VueJS ke naam ka
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.box {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.view-expenses {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    max-height: 100%;
    margin: 20px 10px 10px 10px;
    /* justify-content: center; */
}

.view-expenses-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 30vw;
    height: 100%;
}

.view-expenses-right {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
}


.expenses-container {
    /* width: 60%; */
    width: 100%;
    max-width: 650px;
    max-height: 100%;
    /* overflow: auto; */
}

.categories-container {
    margin-right: 50px;
    max-height: 400px;
    min-width: 250px;
}

.title-category {
    font-family: 'Rubik';
    /* font-size: 2rem; */
}

.title-expense {
    font-family: 'Rubik Medium';
    font-size: 2rem;
}

.expense-tools {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.expense-tools-buttons {
    margin-top: 10px;
}

.expense-tools-button {
    margin: 0 5px 0 0px
}

.expense-list-container {
    /* margin: 20px 20px 10px 20px; */
    max-width: 100%;
    /* height: 100%; */
    max-height: 100%;
    overflow: auto;
    /* overflow-x: auto; */
}

.expense-list {
    margin: 0 10px 0 10px;
}

.expense-card {
    /* background-color: red; */
    /* margin: 20px 20px 20px 20px; */
}

</style>

<script>
import TagInput from '@/components/TagInput.vue';

export default {
  components: {
    TagInput,
  },
};

</script>