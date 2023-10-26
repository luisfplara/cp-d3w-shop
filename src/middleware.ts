import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
// import * as Realm from "realm-web"
import "dotenv"
import { RealmApp, app } from "server/apollo"
import useApp from "@components/useApp"

type Middleware = (request: NextRequest) => NextResponse

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get("auth")?.value

  if (authSession) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
// const app = new Realm.App(process.env.ATLAS_APP_ID||'')
/*
async function getValidAccessToken() {
  console.log("buscouuuu")
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

const authenticated: Middleware = (request) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  console.log("RealmApp.currentUser", app.currentUser)
  /*
  if (!app.currentUser) {
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.set({
      name: "redirect",
      value: request.url,
    })
    return response
  }
  */

  return NextResponse.next()
}

/*
  const authenticated: Middleware = (request) => {
    if (RealmApp.currentUser)
      const authSession = request.cookies.get("auth")?.value

    if (!authSession) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.set({
        name: "redirect",
        value: request.url,
      })
      return response
    }

    return NextResponse.next()
  }
*/
export default function middleware(request: NextRequest) {
  // Uncomment if you want to redirect if authenticated.
  // if ([
  //   '/login',
  //   '/register',
  // ].includes(request.nextUrl.pathname)) {
  //   return redirectIfAuthenticated(request)
  // }

  if (
    ["/", "/products", "/pokemons", "/pokemons/client"].includes(
      request.nextUrl.pathname
    )
  ) {
    return authenticated(request)
  }

  return NextResponse.next()
}
