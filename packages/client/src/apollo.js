import Vue from 'vue';
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat, split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'



// HTTP connection to the API
const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  })
  
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem("userToken");
    operation.setContext({
        headers: {
        authorization: `Bearer ${token}` || null,
        }
    });
    return forward(operation);
})


const cache = new InMemoryCache()


export const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
    connectToDevTools: true
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.use(VueApollo);

export default apolloProvider;