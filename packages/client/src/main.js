import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './App.css'
import App from './App.vue';
import router from './router';
import store from './store'

import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat, split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


Vue.use(VueApollo)

Vue.config.productionTip = false;
Vue.use(Buefy);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}` || null,
    }
  });
  return forward(operation);
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


// const app = createApp(App).use(router).mount('#app');
// app.use(Buefy);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');



