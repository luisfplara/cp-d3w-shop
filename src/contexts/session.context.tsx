import * as Realm from "realm-web"
import { PropsWithChildren, createContext, useMemo } from "react"
import { SessionContextType } from "@models/session"

const iSessionContextState = {
  userSession: null
}

export const SessionContext =
  createContext<SessionContextType>(iSessionContextState)

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const userSession = Realm.App.getApp("application-0-wdnkb")

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
