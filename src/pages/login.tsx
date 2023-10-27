import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from "react-bootstrap"
import Link from "next/link"
import { FormEvent, ReactElement, useContext, useState } from "react"
import { useRouter } from "next/router"
import { deleteCookie, getCookie } from "cookies-next"
import { MongoDBRealmError } from "realm-web"
import * as Realm from "realm-web"
import { SessionContext } from "src/contexts/session.context"
import { NextPageWithLayout } from "./_app"

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | undefined>()
  const { userSession } = useContext(SessionContext)

  // const { logIn } = useContext(UserContext) as UserContextType
  // const app = new Realm.App("application-0-wdnkb")

  const getRedirect = () => {
    const redirect = getCookie("redirect")
    if (redirect) {
      deleteCookie("redirect")
      return redirect.toString()
    }
    return "/"
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    setSubmitting(true)
    setLoginError(undefined)

    if (form.checkValidity() === true) {
      const credentials = Realm.Credentials.emailPassword(
        String(formData.get("email")) || "",
        String(formData.get("password")) || ""
      )
      await userSession
        ?.logIn(credentials)
        .catch((error: MongoDBRealmError) => {
          setLoginError(error.error)
        })

      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  <form onSubmit={login}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        required
                        disabled={submitting}
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </InputGroup>

                    {loginError && (
                      <Alert key="danger" variant="danger">
                        {loginError}
                      </Alert>
                    )}
                    <Row>
                      <Col xs={6}>
                        <Button
                          className="px-4"
                          variant="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Login
                        </Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button className="px-0" variant="link" type="submit">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <h2>Sign up</h2>
                  <p>
                    Create a free account to use the basic tools of our platform
                  </p>
                  <Link href="/register">
                    <button
                      className="btn btn-lg btn-outline-light mt-3"
                      type="button"
                    >
                      Register Now!
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
Login.getLayout = function getLayout(page: ReactElement) {
  return page
}
export default Login
