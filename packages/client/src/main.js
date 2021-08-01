import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './App.css'
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Buefy);

// const app = createApp(App).use(router).mount('#app');
// app.use(Buefy);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// Vue.createApp(App)
//   .use(router)
//   // .use(Buefy)
//   .mount('#app');
