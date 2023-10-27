import "@styles/globals.scss"
import type { AppProps } from "next/app"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { ProgressBar } from "@components/ProgressBar"

import { AdminLayout } from "@layout"

import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { SessionProvider } from "../contexts/session.context"
import GraphQLProvider from "../../server/apollov2"

config.autoAddCss = false

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) =>
      page.props.statusCode !== 404 ? (
        <AdminLayout>
          <ProgressBar />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {page}
        </AdminLayout>
      ) : (
        page
      ))

  return (
    <SessionProvider>
      <GraphQLProvider>
        {getLayout(
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          <Component {...pageProps} />
        )}
      </GraphQLProvider>
    </SessionProvider>
  )
}

export default MyApp

/*

return (
  <AdminLayout>
    <ProgressBar />
    { eslint-disable-next-line react/jsx-props-no-spreading }
    <Component {...pageProps} />
  </AdminLayout>
)


*/
