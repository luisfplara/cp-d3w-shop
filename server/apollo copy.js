import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withApollo } from 'next-apollo';

const httpLink = createHttpLink({
  uri: 'https://parseapi.back4app.com/graphql',
});

const authLink = setContext((_, { headers }) => { 
  const faunaKey = 'fnAFL5kmgCAAUR-alBXPCJkNvTNB42y01Mao6cJn';
  return {
    headers: { 
      ...headers,
      authorization: 'X-Parse-Master-Key : HxHijeFjaXp477G2S6SSapYiO97HquSSJuMxZDZM'
    }
  }
});

export const client = new ApolloClient({
  
  uri: 'https://parseapi.back4app.com/graphql',
  headers: {
    
    "X-Parse-Session-Token":"r:7d2c3aa01aefbae0c89082d82a641966",
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
    "X-Parse-Client-Key": process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY,
  },
  cache: new InMemoryCache(),
});

export default withApollo( client );

/**import { withApollo } from 'next-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';


const API_URI = `https://graphql.fauna.com/graphql`;
console.log(process.env.NEXT_PUBLIC_SERVER_URL);
console.log(process.env.FAUNA_ADMIN_KEY);

const apolloClient = new ApolloClient( {
    uri: API_URI,
    headers: {
        authorization: `Bearer fnAFLrNQMDAAUf3nE4k9Zt80u1bTaqlZwL9ziJNm`,
      },
    cache: new InMemoryCache()
} );


console.log(apolloClient)


export default withApollo( apolloClient );
**/