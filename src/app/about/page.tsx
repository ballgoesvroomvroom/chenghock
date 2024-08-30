"use client"

import headshot from "@/public/graphics/headshot_square.jpg"
import { SocialsContainer } from "@/app/components/socials"
import { TopbarContext } from "@/app/components/topbar/topbar"
import { useContext, useEffect } from "react";

function LeftColumn() {
	return (
		<div className="flex flex-col basis-1/3 grow shrink min-w-0 border-r-2 border-black border-solid">
			<div className="p-4">
				<h1 className="font-bold text-5xl">I am a student</h1>
				<p className="text-xl">Diploma in Applied AI & Analytics @ NYP</p>
			</div>
			<div className="grow">
				<img className="w-full" src={headshot.src} />
			</div>
			<div className="grow flex flex-col justify-end p-4">
				<SocialsContainer iconSize={32} />
			</div>
		</div>
	)
}

function MiddleColumn() {
	return (
		<div className="grow basis-1/3">
			<section className="p-4 border-b-2 border-black border-solid">
				<h2 className="text-3xl font-bold underline decoration-dotted mb-4">What I am fluent in</h2>
				<p className="pb-2">Since young, I had a strong passion for developing things. It started off with game development on the Roblox engine, before deviating into Python to automate processes with scripts.</p>
				<p>Now, I enjoy building web applications more than ever with exciting technologies, such as Express.js or React.</p>
			</section>
		</div>
	)
}

function RightColumn() {
	return (
		<div className="grow basis-1/3"></div>
	)
}

export default function AboutMePage() {
	const { topbarHt, setForceTopbarScrollState } = useContext(TopbarContext)

	useEffect(() => {
		if (!setForceTopbarScrollState) {
			return
		}

		setForceTopbarScrollState(true) // force .scrolled state on topbar for this page
	}, [setForceTopbarScrollState])

	return (
		// @ts-ignore
		<div className={`flex flex-row min-h-[var(--ht)] md:h-[var(--ht)]`} style={{"--ht": `calc(100svh - ${topbarHt}px)`}}>
			<LeftColumn />
			<MiddleColumn />
			<RightColumn />
		</div>
	)
}