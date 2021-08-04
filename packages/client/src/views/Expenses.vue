<template>
    <div class="view-expenses">
        <b-modal
            v-model="isAddExpenseModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <template #default="props">
                <add-expense-modal  v-bind="addExpenseForm" @close="props.close">
                </add-expense-modal>
            </template>
        </b-modal>
        <div class="view-expenses-left">
            <div class="expenses-toolbox">
                <div>
                    <b-button 
                        class="is-primary is-light add-expense-button" 
                        expanded
                        @click="isAddExpenseModalActive = true"
                    >
                        Add Expense
                    </b-button>
                </div>
                <div class="categories-container notification">
                    <div class="title-category">
                        Categories
                    </div>
                    <div class="expense-tools-container">
                        <tag-input v-on:categories-selected="filterByCategory"></tag-input>
                        <div class="expense-tools-buttons">
                            <b-button
                                class="expense-tools-button" 
                                type="is-warning is-small"
                                icon-left="chevron-up"
                            >
                                Date
                            </b-button>
                            <b-button 
                                type="is-warning is-small"
                                icon-left="chevron-up"
                            >
                                Amount
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-expenses-right">
            <div class="expenses-container">
                <b-field>
                    <b-input placeholder="Search..."
                        type="search"
                        icon-pack="fas"
                        icon="search">
                    </b-input>
                </b-field>
                <div class="expense-list-container">
                    <div class="expense-list">
                        <expense-card
                            v-for="expense in expenseList" 
                            v-bind:key="expense.id"
                            v-bind:expense="expense"
                            class="box expense-card"
                        >
                        </expense-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TagInput from '@/components/TagInput.vue';
import ExpenseCard from '@/components/ExpenseCard.vue'
import { mapActions, mapGetters, mapState } from 'vuex';
import AddExpenseModal from '../components/AddExpenseModal.vue';

export default {
    components: {
        TagInput,
        ExpenseCard,
        AddExpenseModal,
    },
    data: function() {
        return {
            isAddExpenseModalActive: false,
            addExpenseForm: {
                modalTitle: "Add an Expense",
                amount: null,
                category: null,
                incurredAt: null,
                description: null,
                action: 'add'
            }
        }
    },
    computed: {
        ...mapState({
            categories: state => state.expenses.categories,
            defaultCurrency: state => state.auth.user.default_currency
        }),
        ...mapGetters({
            expenses: 'expenses/sortedByTimeLatestFirst'
        }),
        expenseList: function() {
            return this.expenses;
        }
    },
    created() {
        this.getExpenses(this.$store.state.auth.user.id);
        if (this.$store.state.expenses.categories === null) {
            this.getCategories();
        }
    },
    methods: {
        ...mapActions('expenses', {
            getExpenses: 'fetchExpenses',
            getCategories: 'fetchCategories',
        }),
        filterByCategory(categories) {
            // console.log("emit recieved");
            this.$store.dispatch('expenses/addFilterCategory', categories);
        },

    }
};

</script>


<style>

.box {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.view-expenses {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    max-height: 100%;
    justify-content: center;
}

.view-expenses-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 40vw;
    height: 100%;
}

.view-expenses-right {
    display: flex;
    flex-direction: row;
    width: 60vw;
}


.expenses-container {
    /* width: 60%; */
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
    max-height: 100%;
    /* overflow: auto; */
}

.add-expense-button {
    margin-bottom: 10px;
}

.categories-container {
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

.expenses-toolbox {
    margin: 20px 60px 0 0;
    max-width: 300px;
    min-width: 300px;
}

.expense-tools-container {
    max-width: 100%;
}

.expense-tools-buttons {
    margin-top: 10px;
}

.expense-tools-button {
    margin: 0 5px 0 0px
}

.expense-list-container {
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    flex-grow: 1;
    overflow: auto;
    margin: 5px 0 5px 0;
}

 /* Hide scrollbar for Chrome, Safari and Opera */
.expense-list-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.expense-list-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 

.expense-list {
    display: flex;
    flex-direction: column;
    margin: 10px 5px 10px 5px;
}

</style>
