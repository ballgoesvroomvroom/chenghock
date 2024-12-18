"use client"

import { useContext } from "react"
import { TopbarContext } from "@/app/components/topbar/topbar"

export default function NotFound() {
	const { topbarHt, setForceTopbarScrollState } = useContext(TopbarContext)

	return (
		// @ts-ignore
		<div className="min-h-[var(--ht)] md:h-[var(--ht)] w-full flex flex-row justify-center items-center" style={{"--ht": `calc(100svh - ${topbarHt}px - 2px)`}}>
			<div className="w-2/3 p-6 flex flex-row justify-center items-center gap-6">
				<div className="grow basis-1/2 hidden md:block">
					<svg className="w-full h-full" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
						<path d="m164.02 190.9c59.676 51.328 100.19-63.971 34.371-76.332-51.97-9.761-77.385 44.256-35.115 74.83" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="16" />
						<path d="m187.16 327c0-36.871-5.345-73.742-16.034-110.61-41.464 101.51 35.978 77.569 55.119 75.324h9.754" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="16" />
						<path d="m171.43 216.05c63.721 94.635 60.746 77.771 60.746-5.474-5.034-3.689-9.848-3.689-14.441 0" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="16" />
						<path d="m170.48 32.462c3.6-7.7057 10.656-11.873 16.108-13.055 7.397-1.6032 13.652 1.5363 15.795 9.3832 0.739 2.7069 0.439 7.0541-1.253 9.9166-1.561 2.6386-3.636 4.8017-7.044 7.7056-0.635 0.5418-2.805 2.3525-3.009 2.5246-4.635 3.906-6.921 6.4778-8.233 9.7349-1.313 3.257-1.243 13.369 8.233 12.504" opacity=".50544" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="12" />
						<path d="m186.14 84.768v1.9344" opacity=".50544" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="12" />
					</svg>
				</div>
				<div className="grow basis-1/2 flex flex-col gap-2">
					<h1 className="font-bold text-8xl mb-4">404</h1>
					<p className="text-2xl">You discovered an unexplored area!</p>
					<p className="-mb-2">If you believe a peice of content is missing, please reach out to me at <a className="link" href="mailto:chong_cheng_hock@outlook.com">chong_cheng_hock@outlook.com</a>.</p>
					<p>Alternatively, visit <a className="link" href="/contact">/contact</a> for more contact options.</p>
				</div>
			</div>
		</div>
	)
}