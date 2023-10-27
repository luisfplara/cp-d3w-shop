import * as Realm from "realm-web"
import { PropsWithChildren, createContext, useEffect, useMemo } from "react"
import { SessionContextType } from "@models/session"
import { useRouter } from "next/router"

const iSessionContextState = {
  userSession: null
}

export const SessionContext =
  createContext<SessionContextType>(iSessionContextState)

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const userSession = Realm.App.getApp("application-0-wdnkb")

  const router = useRouter()

  useEffect(() => {
    if (
      !userSession.currentUser &&
      router.pathname !== "/login" &&
      router.pathname !== "/register"
    ) {
      router.push("/login")
    }
  }, [])

  const providerValues = useMemo(
    () => ({
      userSession
    }),
    [userSession]
  )

  return (
    <SessionContext.Provider value={providerValues}>
      {children}
    </SessionContext.Provider>
  )
}
