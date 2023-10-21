import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  
} from "@apollo/client";
import { withApollo } from 'next-apollo';

const APP_ID = "application-0-wdnkb"

const app = new Realm.App(APP_ID);

async function getValidAccessToken() {

  if (!app.currentUser) {

    const credentials = Realm.Credentials.emailPassword("teste@teste.com", "abcd1234");
    await app.logIn(credentials);
  } else {

    await app.currentUser.refreshAccessToken();
  }
  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://sa-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-wdnkb/graphql`,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

export default withApollo( client );