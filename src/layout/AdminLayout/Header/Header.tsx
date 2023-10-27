import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { Button, Container } from "react-bootstrap"
import HeaderNotificationNav from "@layout/AdminLayout/Header/HeaderNotificationNav"
import HeaderProfileNav from "@layout/AdminLayout/Header/HeaderProfileNav"
import useApp from "@components/useApp"

type HeaderProps = {
  toggleSidebar: () => void
}

export default function Header(props: HeaderProps) {
  const user = useApp()

  const { toggleSidebar } = props

  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center">
        <Button
          variant="link"
          className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title>Control Panel</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>
        <div className="header-nav ms-auto">
          <HeaderNotificationNav />
        </div>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <div className="header-nav ms-2">
          Hello, {String(user?.currentUser?.customData.name)}
        </div>
        <div className="header-nav ms-2">
          <HeaderProfileNav />
        </div>
      </Container>
    </header>
  )
}
