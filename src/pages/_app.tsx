import "@styles/globals.scss"
import type { AppProps } from "next/app"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { ProgressBar } from "@components/ProgressBar"

import { AdminLayout } from "@layout"

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminLayout>
      <ProgressBar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </AdminLayout>
  )
}

export default MyApp
