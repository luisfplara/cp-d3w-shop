import { useEffect, useState } from "react"
import * as Realm from "realm-web"
import "dotenv"
/*
export default function useApp() {
  console.log("env:   ", process.env.ATLAS_APP_ID)
  const [app, setApp] = useState<Realm.App>()
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    setApp(Realm.getApp("application-0-wdnkb"))
  }, [])
  return app
}
*/
