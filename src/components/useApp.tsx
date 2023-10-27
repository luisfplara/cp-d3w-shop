import { useEffect, useState } from "react"
import * as Realm from "realm-web"

export default function useApp() {
  const [app, setApp] = useState<Realm.App | null>()
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    setApp(Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || ""))
  }, [])
  return app
}
