import * as Realm from "realm-web"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { withApollo } from "next-apollo"

const APP_ID = "application-0-wdnkb"

const app = new Realm.App(APP_ID)

export { app }
/*
async function getValidAccessToken() {
  console.log("buscouuuu")
  console.log(app.currentUser)
  if (!app.currentUser) {
    const credentials = Realm.Credentials.emailPassword(
      "teste@teste.com",
      "abcd1234"
    )
    await app.logIn(credentials)
  } else {
    await app.currentUser.refreshAccessToken()
  }
  return app.currentUser.accessToken
}
*/
export async function loginEmailPassword(email, password) {
  const credentials = Realm.Credentials.emailPassword(email, password)
  return app.logIn(credentials)
}
async function getValidAccessToken() {
  console.log("buscouuuu")
  console.log(app.currentUser)
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous())
  } else {
    await app.currentUser.refreshAccessToken()
  }
  return app.currentUser.accessToken
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://sa-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-wdnkb/graphql`,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken()
      options.headers.Authorization = `Bearer ${accessToken}`
      return fetch(uri, options)
    },
  }),
  cache: new InMemoryCache(),
})

export default withApollo(client)
