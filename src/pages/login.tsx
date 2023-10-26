// import { NextPage } from "next"
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
import * as Realm from "realm-web"

import { UserContext } from "src/contexts/user.context"

import { app, loginEmailPassword } from "server/apollo"

import { NextPageWithLayout } from "./_app"

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | undefined>()
  // const { emailPasswordLogin } = useContext(UserContext)

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
      const userLogin = await loginEmailPassword(
        String(formData.get("email")) || "",
        String(formData.get("password")) || ""
      )

      console.log("userLogin", userLogin)

      if (userLogin) {
        router.push(getRedirect())
      }
    }
    setSubmitting(false)

    /*
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
  

    if (res.status === 200) {
      router.push(getRedirect())
    }
      */
  }

  /*
  const login = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    const res = await axios.post("api/mock/login")
    if (res.status === 200) {
      router.push(getRedirect())
    }
    setSubmitting(false)
  }
  
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
