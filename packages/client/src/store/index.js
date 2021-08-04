import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import expenses from './modules/expenses';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    expenses
  },
});