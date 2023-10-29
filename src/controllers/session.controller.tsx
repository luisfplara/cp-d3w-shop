import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SessionContext } from "src/contexts/session.context"

const SessionController = ({ children }: PropsWithChildren) => {
  const { userSession } = useContext(SessionContext)
  const [session, setSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (
      !userSession?.currentUser &&
      router.pathname !== "/login" &&
      router.pathname !== "/register"
    ) {
      router.push("/login")
    } else {
      setSession(true)
    }
  })

  if (
    !session &&
    router.pathname !== "/login" &&
    router.pathname !== "/register"
  ) {
    console.log(userSession?.currentUser)
    return <div>loading</div>
  }

  return children
}

export default SessionController
