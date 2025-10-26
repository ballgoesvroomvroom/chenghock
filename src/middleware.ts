import { NextResponse, NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname
	console.log("pathname", pathname)
	if (pathname.startsWith("/resume")) {
		// '/resume' route redirect
		return NextResponse.redirect("https://softsquirrels.s3.ap-southeast-1.amazonaws.com/resume.pdf", 308)
	} else if (pathname.startsWith("/cv")) {
		// '/cv' route redirect
		return NextResponse.redirect("https://softsquirrels.s3.ap-southeast-1.amazonaws.com/cv.pdf", 308)
	}

	return NextResponse.next()
}

export const config = {
	matcher: "/resume"
}
