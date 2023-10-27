import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client"
import { PropsWithChildren, useContext } from "react"
import * as Realm from "realm-web"

import { useRouter } from "next/router"
import { SessionContext } from "src/contexts/session.context"

async function getValidAccessToken(
  app: Realm.App | null | undefined,
  login: () => void
) {
  if (!app?.currentUser) {
    login()
  } else {
    await app?.currentUser.refreshAccessToken()
  }
  return app?.currentUser?.accessToken
}

function GraphQLProvider({ children }: PropsWithChildren) {
  const { userSession } = useContext(SessionContext)

  const router = useRouter()
  const login = () => {
    router.push("/login")
  }
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken(userSession, login)
        if (options) {
          const reqHeaders = new Headers(options?.headers)
          reqHeaders.set("Authorization", `Bearer ${accessToken}`)

          // eslint-disable-next-line no-param-reassign
          options.headers = reqHeaders
        }
        return fetch(uri, options)
      }
    }),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default GraphQLProvider
