"use client"

import { SocialsContainer, SOCIALS_LINKEDIN, SOCIALS_GITHUB, SOCIALS_TELEGRAM, SOCIALS_EMAIL } from "@/app/components/socials"
import { TopbarContext } from "@/app/components/topbar/topbar"

import quotation_icon from "@/public/icons/quotes.svg"
import { useContext, useEffect, useRef, useState } from "react"

function ScrollingBanner() {
	const [textCount, setTextCount] = useState(10)
	const [textWidth, setTextWidth] = useState(0)
	const textRef = useRef<HTMLParagraphElement>(null)

	const computeTextCount = () => {
		if (!textRef.current) {
			return
		}

		const rect = textRef.current.getBoundingClientRect()
		setTextWidth(rect.width)
		setTextCount(Math.ceil(window.innerWidth /rect.width) +1) // +1 to account for last item
	}

	useEffect(() => {
		window.addEventListener("resize", computeTextCount)
		computeTextCount()

		return () => {
			window.removeEventListener("resize", computeTextCount)
		}
	}, [])

	return (
		<div id="scrolling-window" className="mt-auto overflow-x-clip opacity-75">
			<div className="flex gap-8 transition-transform duration-1000 ease-linear" style={{
				// @ts-ignore
				"--namebanneroffset": `calc(-${textWidth}px - 2rem)`,
				animationName: "namebannerlr",
				animationDuration: "2s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear",
				animationDirection: "initial"
			}}>
				{
					[...Array(textCount).fill(0)].map((_, i) => {
						return (<p className="text-2xl font-bold whitespace-nowrap" key={i} ref={i === 0 ? textRef : null}>CHONG CHENG HOCK</p>)
					})
				}
			</div>
		</div>
	)
}

function SocialsCardRow() {
	return (
		<div className="flex flex-wrap gap-4 p-4 md:p-8 mt-12 sm:mt-24">
			{
				[["LinkedIn", SOCIALS_LINKEDIN, "Chong Cheng Hock"],
				["GitHub", SOCIALS_GITHUB, "Ballgoesvroomvroom"],
				["Telegram", SOCIALS_TELEGRAM, "cheng_hock"],
				["Email", SOCIALS_EMAIL, "hi@chenghock.com"]].map((item, i) => 
					<a className={`p-3 inline-flex flex-col gap-3 border-solid border-black border-2`} href={item[1]} target="_blank">
						<p className="font-bold text-lg">{item[0]}</p>
						<p>{item[2]}</p>
					</a>
				)
			}
		</div>
	)
}

export default function ContactPage() {
	const { topbarHt, setForceTopbarScrollState } = useContext(TopbarContext)

	return (
		// @ts-ignore
		<div className="flex flex-col md:pt-24 sm:min-h-[var(--ht)]" style={{"--ht": `calc(100svh - ${topbarHt}px - 2px)`}}>
			<div className="flex justify-between gap-48 p-4 md:p-8">
				<div className="grow">
					<h1 className="font-bold text-4xl pb-4">Reach out</h1>
					<p className="pb-2">I would love to receive guidance and feedback on any of my works.</p>
					<p className="pb-6 md:pb-12">I keep all my socials open for direct messaging, please feel free to reach out to me on any channels listed.</p>
					<SocialsContainer iconSize={48} />
				</div>
				<div className="hidden md:flex flex-col gap-2 items-start opacity-40 hover:opacity-100 transition-opacity">
					<img src={quotation_icon.src} style={{transform: "scaleX(-1)"}} />
					<p className="font-bold text-4xl">A single leaf working alone provides no shade.</p>
					<div className="flex gap-4 self-end">
						<p className="font-bold text-lg">~ Chuck Page</p>
						<img src={quotation_icon.src} />
					</div>
				</div>
			</div>
			<SocialsCardRow />
			<ScrollingBanner />
		</div>
	)
}