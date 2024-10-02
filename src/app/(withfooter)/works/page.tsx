"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData, ProjectDataOrder, ProjectDataType } from "@/app/data/projects"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

interface HTMLCardElement extends HTMLButtonElement {
	_mouseEnter?: () => void,
	_mouseLeave?: () => void,
	_click?: () => void
}

const CARD_HOVER_GROWTH = 3 // 3% extra from restCardWidth (width for cards at rest)
function ProjectList() {
	let [activeIdx, setActiveIdx] = useState(0)

	const [cardWidth, setCardWidth] = useState(0)
	const [cardHeight, setCardHeight] = useState(0)
	const [hoverCardIdx, setHoverCardIdx] = useState<number|null>(null)

	const [mainCardWidth, setMainCardWidth] = useState(80) // 90% of space
	const [expandedCardWidth, setExpandedCardWidth] = useState((100 -mainCardWidth -CARD_HOVER_GROWTH) /(ProjectDataOrder[0].length -1) +CARD_HOVER_GROWTH) // remaining space + a bit more
	const [restCardWidth, setRestCardWidth] = useState((100 -mainCardWidth -(hoverCardIdx == null ? 0 : CARD_HOVER_GROWTH)) /(ProjectDataOrder[0].length -1)) // remaining spce

	const containerRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<(HTMLCardElement|null)[]>([])
	const focusCard = (i: number, card: HTMLCardElement) => {
		if (card.classList.contains("active")) {
			return // do nothing
		}
		setHoverCardIdx(i) // set space
	}
	const unfocusCard = (i: number, card: HTMLCardElement) => {
		setHoverCardIdx(null) // reset
	}
	const clickCard = (i: number, card: HTMLCardElement) => {
		if (activeIdx === i) {
			// already clicked
			return
		}

		// update state
		setActiveIdx(i)

		// if hovering over newly selected card, remove hover effect
		if (hoverCardIdx === i) {
			// un-hover
			setHoverCardIdx(null)
		}
	}

	// enforce 16:9 height on cards on screen size change
	const updateCardHt = () => {
		if (!containerRef.current) {
			return
		}

		let rect = containerRef.current.getBoundingClientRect()
		let computedCardWidth = mainCardWidth /100 *rect.width
		setCardWidth(computedCardWidth)
		setCardHeight(computedCardWidth *.5625) // 16:9 aspect ratio
		console.log("height", rect.width *.5625)
	}

	useEffect(() => {
		if (!cardsRef.current) {
			return
		}

		// card hover events
		let i = 0;
		for (let card of cardsRef.current) {
			if (!card) {
				continue
			}

			let ii = i++
			const mouseEnter = () => focusCard(ii, card)
			const mouseLeave = () => unfocusCard(ii, card)
			const click = () => clickCard(ii, card)

			card.addEventListener("mouseenter", mouseEnter)
			card.addEventListener("mouseleave", mouseLeave)
			card.addEventListener("click", click)

			card._mouseEnter = mouseEnter
			card._mouseLeave = mouseLeave
			card._click = click
		}

		// cleanup function
		return () => {
			for (let card of cardsRef.current) {
				if (card?._mouseEnter) {
					card?.removeEventListener("mouseenter", card._mouseEnter)
				}
				if (card?._mouseLeave) {
					card?.removeEventListener("mouseleave", card._mouseLeave)
				}
				if (card?._click) {
					card?.removeEventListener("click", card._click)
				}
			}
		}
	}, [containerRef, activeIdx, cardsRef])

	useEffect(() => {
		// enforce 16:9 height on cards
		window.addEventListener("resize", updateCardHt)
		console.log("hooked")
		updateCardHt() // initial set

		return () => {
			window.removeEventListener("resize", updateCardHt)
		}
	}, [])

	useEffect(() => {
		setRestCardWidth((100 -mainCardWidth -(hoverCardIdx == null ? 0 : CARD_HOVER_GROWTH)) /(ProjectDataOrder[0].length -1))
	}, [hoverCardIdx])


	return (
		<div className="relative w-full md:px-32">
			<div ref={containerRef} className="w-full">
			{
				ProjectDataOrder[0].map((projectId, i) => 
					<button key={i} ref={el => {cardsRef.current[i] = el}}
						className={
							`workcard group relative h-full ${activeIdx === i ? "active" : ""} overflow-clip float-left block transition-all cursor-pointer`
						}
						style={{
							width: "100%",
							height: cardHeight,
							maxWidth: `${activeIdx === i ? mainCardWidth : (hoverCardIdx === i ? expandedCardWidth : restCardWidth)}%`,
							zIndex: ProjectDataOrder[0].length -i
						}}
					>
						<div className="absolute top-0 right-0 p-4 flex flex-col justify-between h-full font-bold text-xl text-white" style={{
							display: activeIdx === i ? "none" : "flex",
							zIndex: 3,
						}}>
							<div className="text-right">{i +1}</div>
							<p className="group-[:not(.active):hover]:block hidden z-10 text-accent">{ProjectData[projectId].title}</p>
						</div>
						<div className="absolute top-0 right-0 flex flex-col items-center justify-end" style={{
							width: cardWidth,
							height: cardHeight,
							display: activeIdx === i ? "flex" : "none",
							zIndex: 2
						}}>
							<div className="p-2 w-full bg-[#1a1a1ad4] backdrop-blur-[2px] flex flex-row items-end">
								<p className="text-lg text-white grow">{ProjectData[projectId].title}</p>
								<a href={`/works/${projectId}`} className="inline-flex border-2 border-black border-solid items-center px-2 bg-white text-lg text-black rounded"><span>More</span></a>
							</div>
						</div>
						<div className="absolute top-0 right-0 w-full" style={{
							height: cardHeight,
							display: activeIdx -1 === i ? "block" : "none",
							background: "linear-gradient(90deg, rgba(0,0,0,0) 92%, rgba(0,0,0,0.4) 100%)",
							zIndex: 2
						}}>
						</div>
						<div className="absolute top-0 right-0 w-full" style={{
							height: cardHeight,
							display: activeIdx === i ? "none" : "block",
							background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 8%)",
							zIndex: 3
						}}>
						</div>
						<div className="absolute top-0 right-0 transition-all" style={{
							width: cardWidth,
							height: cardHeight,
							display: activeIdx === i ? "none" : "block",
							background: hoverCardIdx === i ? "rgba(0,0,0,.1)"
								: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,.4) 100%)",
							zIndex: 2,
						}}>
						</div>
						<img className="absolute top-0 right-0"
							style={{
								width: cardWidth,
								height: cardHeight,
								maxWidth: "unset"
							}}
							src={ProjectData[projectId].coverImg.src}/>
					</button>
				)
			}
			</div>
		</div>
	)
}

function Journey() {
	return (
		<div className="flex flex-row justify-center items-center p-4 -mt-32 box-content min-h-svh bg-black-accent text-white">
			<div className="max-w-[800px] flex flex-row gap-4">
				<div className="flex flex-col">
					<h1 className="font-bold text-9xl whitespace-nowrap">6 Years</h1>
					<p className="text-2xl">of creating experiences</p>
				</div>
				<div className="mr-12 border-white border-dotted border-0 border-r-[8px] origin-top transition-transform" style={{
					animationName: "heightscale",
					animationDuration: "2s",
					animationDirection: "alternate",
					animationIterationCount: "infinite",
				}}>
				</div>
				<div className="min-w-0 shrink">
					<p>A passionate and motivated individual since young. I have always been passionate to pick up new technical skills within the use of computers.</p>
					<p>Over the course of 6 years, the many projects I undertook has allowed me to accumulate experiences and skillsets.</p>
				</div>
			</div>
		</div>
	)
}

export default function Home() {
	const { topbarHt } = useContext(TopbarContext)

	const [workSwitchState, setWorkSwitchState] = useState<0|1>(0) // 0 for web application panel, 1 for data journalism panel
	const workSwitchWABtn = useRef<HTMLButtonElement>(null)
	const workSwitchDJBtn = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (workSwitchWABtn.current == null || workSwitchDJBtn.current == null) {
			return
		}

		const focusWA = () => {
			// switch to web application panel
			setWorkSwitchState(0)
		}

		const focusDJ = () => {
			// switch to data journalism panel
			setWorkSwitchState(1)
		}

		workSwitchWABtn.current.addEventListener("click", focusWA)
		workSwitchDJBtn.current.addEventListener("click", focusDJ)

		return () => {
			workSwitchWABtn.current?.removeEventListener("click", focusWA)
			workSwitchDJBtn.current?.removeEventListener("click", focusDJ)
		}
	}, [workSwitchWABtn, workSwitchDJBtn])

	return (
		<main className="w-full flex flex-col">
			<div className="flex flex-col p-8">
				<div className="p-10 flex flex-col gap-2 items-center justify-center">
					<h1 className="font-bold text-2xl">Works</h1>
				</div>
				<ProjectList />
			</div>
			<Journey />
		</main>
	);
}
