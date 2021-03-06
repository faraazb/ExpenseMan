import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './App.css'
import App from './App.vue';
import router from './router';
import store from './store'
import apolloProvider from './apollo';

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
