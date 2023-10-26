import * as Realm from "realm-web"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID)

async function getValidAccessToken() {
  console.log("buscouuuu")
  console.log(app.currentUser)

  if (!app.currentUser) {
    return
  } else {
    await app.currentUser.refreshAccessToken()
  }
  return app.currentUser.accessToken
}
/*
function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    async function fetchAccessToken() {
      const token = await getValidAccessToken()
      setAccessToken(token)
    }

    fetchAccessToken()
    const interval = setInterval(fetchAccessToken, 29 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return accessToken
}
*/

function GraphQLProvider({ children }) {
  const [accessToken, setAccessToken] = useState()
  const router = useRouter()

  getValidAccessToken().then((token) => {
    if (!token) {
      router.push(`/login`)
    } else {
      setAccessToken(token)
    }
  })

  if (!accessToken) {
    return <div>Loading...</div>
  }

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default GraphQLProvider
