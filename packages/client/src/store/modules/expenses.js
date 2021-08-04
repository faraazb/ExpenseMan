import { apolloClient } from '@/apollo';
import { 
    getExpenses, 
    getCategories, 
    getTotalExpense,
    getTotalExpenseByCategory,
    getTotalExpenseByWeek
 } from '@/graphql/queries';

 import { createExpense, updateExpense, deleteExpense,  } from '@/graphql/mutations'

const state = () => ({
    all: [],
    categories: null,
    selectedCategories: [],
    fetchExpenseError: null,
    addExpenseError: null,
    updateExpenseError: null,
    fetchCategoriesError: null,
    totalExpense: {
        amount: null,
        byCategory: [],
        byWeek: []
    }
});

const getters = {
    filteredExpenses: (state) => {
        if (state.selectedCategories.length == 0) {
            return state.all
        }
        let ctgNames = state.selectedCategories.map(c => c.name)
        return state.all.filter(expense => ctgNames.includes(expense.category.name))
    },
    sortedByTimeLatestFirst: (state, getters) => {
        // console.log("called", state.all)
        return [...getters.filteredExpenses].sort((a, b) => {
            let c = new Date(a.incurredAt);
            let d = new Date(b.incurredAt)
            return d-c;
        })
    },
    sortedByTimeOldestFirst: (state, getters) => {
        return [...getters.sortedByTimeLatestFirst].reverse();
    },
    sortedByAmountHighestFirst: state => {
        return [...state.all].sort((a, b) => {
            return a-b;
        })
    },
    sortedByAmountLowestFirst: (state, getters) => {
        return [...getters.sortedByAmountLowestFirst].reverse();
    },
    latestFive: (state, getters) => {
        return getters.sortedByTimeLatestFirst.slice(0, 4);
    },
    getCategoryPieData: (state) => {
        return {
            labels: state.totalExpense.byCategory.map(c => c.category.name),
            data: state.totalExpense.byCategory.map(c => c.amount)
        }
    }
}

const actions = {
    async fetchExpenses({commit}, userId) {
        try {
            // console.log("From actions: ", userId)
            const response = await apolloClient.query({
                query: getExpenses,
                variables: {userId: userId}
            });
            // console.log(response.data.getExpensesByUserId)
            commit('fetchExpensesSuccess', response.data.getExpensesByUserId)
        } catch (error) {
            console.log(error);
            commit('fetchExpensesFail', error);
        }
    },

    async addFilterCategory({commit}, categories) {
        commit('filterCategories', categories);
    },

    async addExpense({commit}, args) {
        try {
            const response = await apolloClient.mutate({
                mutation: createExpense,
                variables: {...args}
            })
            // console.log(response.data.createExpense);
            commit('addExpenseSuccess', response.data.createExpense.expense);
        } catch (error) {
            console.log(error);
            commit('addExpenseFail', error);
        }
    },

    async editExpense({commit}, exp) {
        // console.log(exp)
        try {
            const response = await apolloClient.mutate({
                mutation: updateExpense,
                variables: {...exp}
            })
            if (updateExpense.success === true) {
                console.log(response.data.updateExpense.expense);
                commit('updateExpenseSuccess', response.data.updateExpense.expense);
            }
            else {
                commit('updateExpenseFail', response.data.updateExpense.message);
            }
        } catch (error) {
            console.log(error);
            commit('updateExpenseFail', error);
        }
    },

    async removeExpense({commit}, expenseId) {
        try {
            const response = await apolloClient.mutate({
                mutation: deleteExpense,
                variables: {id: expenseId}
            })
            commit('deleteExpenseSuccess', response.data.deleteExpense, expenseId);
        } catch (error) {
            console.log(errro)
        }
    },

    async fetchCategories({commit}) {
        try {
            const response = await apolloClient.query({
                query: getCategories
            });
            commit('fetchCategoriesSuccess', response.data.getCategories);
        } catch (error) {
            console.log('Error in getCategories', error);
            commit('fetchCategoriesFail', error);
        }
    },

    async fetchTotalExpense({commit}, userId) {
        try {
            const response = await apolloClient.query({
                query: getTotalExpense,
                variables: {userId: userId}
            });
            commit('fetchTotalExpenseSuccess', response.data.getTotalExpense)
        } catch (error) {
            console.log(error);

        }
    },

    async fetchTotalExpenseByCategory({commit}, userId) {
        try {
            const response = await apolloClient.query({
                query: getTotalExpenseByCategory,
                variables: {userId: userId}
            });
            commit('fetchTotalExpenseCategorySuccess', response.data.getTotalExpenseByCategory)
        } catch (error) {
            console.log(error);
        }
    },

    async fetchTotalExpenseByWeek({commit}, userId) {
        try {
            const response = await apolloClient.query({
                query: getTotalExpenseByWeek,
                variables: {userId: userId}
            });
            commit('fetchTotalExpenseByWeekSuccess', response.data.getTotalExpenseByWeek)
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    fetchExpensesSuccess(state, expenses) {
        state.all = expenses;
        state.fetchExpenseError = null;
    },
    fetchExpensesFail(state, error) {
        state.fetchExpenseError = error;
    },
    filterCategories(state, categories) {
        state.selectedCategories = categories
    },
    addExpenseSuccess(state, expense) {
        state.addExpenseError = null;
        state.all.push(expense);
    },
    addExpenseFail(state, error) {
        state.addExpenseError = error;
    },
    updateExpenseSuccess(state, expense) {
        const i = state.all.map(exp => exp.id).indexOf(expense.id);
        state.all.splice(i, 1);
        state.all.push(expense);
    },
    updateExpenseFail(state, error) {
        state.updateExpenseError = error;
    },
    deleteExpenseSuccess(state, data, expenseId) {
        const i = state.all.map(expense => expense.id).indexOf(expenseId);
        state.all.splice(i, 1);
    },
    fetchTotalExpenseSuccess(state, amount) {
        state.totalExpense.amount = Number(amount);
    },
    fetchTotalExpenseCategorySuccess(state, data) {
        state.totalExpense.byCategory = data;
    },
    fetchTotalExpenseByWeekSuccess(state, data) {
        state.totalExpense.byWeek = data;
    },
    fetchCategoriesSuccess(state, categories) {
        state.categories = categories;
        state.fetchCategoriesError = null;
    },
    fetchCategoriesFail(state, error) {
        state.categories = null;
        state.fetchCategoriesError = error;
    }
}


export default {
    namespaced: true,
    state: state,
    getters,
    actions,
    mutations
}