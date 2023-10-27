// import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
  matcher: "/:path*",
}
// request: NextRequest
export default function middleware() {
  return NextResponse.next()
}
