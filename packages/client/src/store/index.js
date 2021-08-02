import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import expenses from './modules/expenses'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    expenses
  },
});

// strict: debug,
// plugins: debug ? [createLogger()] : []