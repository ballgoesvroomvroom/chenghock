"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData, ProjectDataOrder, ProjectDataType } from "@/app/data/projects"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

function ProjectLista() {
	let [activeIdx, setActiveIdx] = useState(0)

	const containerRef = useRef<HTMLDivElement>(null)
	let [cardWidth, setCardWidth] = useState(100)
	let [cardHeight, setCardHeight] = useState(281.25)
	let [closedCardWidth, setClosedCardWidth] = useState(200)
	useEffect(() => {
		if (!containerRef.current) {
			return
		}

		const obs = new ResizeObserver((entries) => {
			let container = entries[0].target

			// local states
			let encounteredActive = false
			let encounteredInactive = false

			for (let child of container.children) {
				// width: entry.contentRect.width
				// height: entry.contentRect.height
				if (child.classList.contains("active")) {
					let rect = child.getBoundingClientRect()
					console.log("rect.width *0.5625", rect.width *0.5625)
					// setCardWidth(rect.width)
					setCardHeight(rect.width *0.5625) // 16:9 aspect ratio
					encounteredActive = true
				} else {
					setClosedCardWidth(child.getBoundingClientRect().width)
					encounteredInactive = true
				}

				if (encounteredActive && encounteredInactive) {
					// encountered both
					// only interested in one occurrence
					return
				}
			}
		})

		// attach observer to container
		obs.observe(containerRef.current)

		// cleanup
		return () => {
			obs.disconnect()
		}
	}, [containerRef])

	const cardsRef = useRef<(HTMLDivElement|null)[]>([])
	useEffect(() => {
		if (!cardsRef.current) {
			return
		}

		for (let card of cardsRef.current) {
			if (!card) {
				continue
			}
			card.addEventListener("mouseenter", () => {
				if (card.classList.contains("active")) {
					return
				}
				card.style.minWidth = "64px"
			})

			card.addEventListener("mouseleave", () => {
				if (card.classList.contains("active")) {
					return
				}
				card.style.minWidth = "0"
			})
		}
	}, [cardsRef])

	useEffect(() => {
		if (!cardsRef.current) {
			return
		}

		const obs = new ResizeObserver((entries) => {
			let card = entries[0].target
			let rect = card.getBoundingClientRect()

			setCardWidth(rect.width)
		})

		// observe active card only
		let activeCard = cardsRef.current[activeIdx]
		if (!activeCard) {
			return
		}
		obs.observe(activeCard)

		// cleanup
		return () => {
			obs.disconnect()
		}
	}, [cardsRef, activeIdx])


	return (
		<div className="relative flex flex-row justify-start w-full min-w-0 mx-4 my-8"
			ref={containerRef}
		>
			{
				ProjectDataOrder[0].map((projectId, i) => 
					<div key={i} ref={el => {cardsRef.current[i] = el}}
						className={
							`group relative p-4 bg-white min-w-0 box-border overflow-clip box-border ${activeIdx === i ? "active" : ""} min-w-0`
						}
						style={{
						minWidth: activeIdx === i ? "auto" : "0",
						flexGrow: activeIdx === i ? 1 : 0,
						flexShrink: activeIdx === i ? 0 : 1,
						// maxWidth: activeIdx === i ? cardWidth : closedCardWidth,
						height: cardHeight
					}}>
						<div className="absolute top-0 right-0 z-10 flex flex-col justify-between">
							<div className="text-right z-10">{i +1}</div>
							<p className="group-[:not(.active):hover]:block hidden z-10">{ProjectData[projectId].title}</p>
						</div>
						<img className="absolute top-0 right-0"
							style={{
								maxWidth: cardWidth,
								width: cardWidth,
								height: cardHeight
							}}
							src={ProjectData[projectId].coverImg.src}/>
					</div>
					// <div key={i} className={`relative border-2 border-black border-solid inline-flex justify-end min-w-0 w-fit group ${activeIdx === i && "card-active"} [&.card-active]:grow`} onClick={() => setActiveIdx(i)}>
					// 	<div className="flex flex-row group-[.card-active]:basis-1/2">
					// 		<div className="basis-[256px] min-w-0 p-4 flex flex-col items-center grow-0 shrink-0 bg-white">
					// 			<h2 className="text-2xl font-bold">{ProjectData[projectId].title}</h2>
					// 		</div>
					// 		<figure className="relative h-full">
					// 			<img src={ProjectData[projectId].coverImg.src} className="h-full object-cover object-center" />
					// 			<div className="absolute bottom-0 left-0 w-full p-2 bg-[#1a1a1ade]">
					// 				<p className="w-full text-sm text-white text-center">Qriller.com - Procedural Generation of O/N-Levels Math Worksheets</p>
					// 			</div>
					// 		</figure>
					// 	</div>
					// 	<p className="p-2 z-10 block">{i +1}</p>
					// </div>
				)
			}
		</div>
	)
}

interface HTMLCardElement extends HTMLDivElement {
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

	const cardsRef = useRef<(HTMLCardElement|null)[]>([])
	const focusCard = (i: number, card: HTMLCardElement) => {
		if (card.classList.contains("active")) {
			return // do nothing
		}
		console.log("hover", i)
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

		// observe active card to set card width for inner image
		let obs = new ResizeObserver((entries) => {
			let activeCard = entries[0].target
			let rect = activeCard.getBoundingClientRect()

			setCardWidth(rect.width)
			setCardHeight(rect.width *.5625) // 16:9 aspect ratio
			console.log("HEIGHT!", rect.width *.5625)
		})
		if (cardsRef.current[activeIdx]) {
			obs.observe(cardsRef.current[activeIdx])
		}

		// cleanup function
		return () => {
			obs.disconnect()

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
	}, [activeIdx, cardsRef])

	useEffect(() => {
		console.log("hovered", hoverCardIdx)
		console.log("rest", restCardWidth)
		console.log("expanded", expandedCardWidth)
		console.log("total", restCardWidth *(ProjectDataOrder[0].length -1) +expandedCardWidth)
		setRestCardWidth((100 -mainCardWidth -(hoverCardIdx == null ? 0 : CARD_HOVER_GROWTH)) /(ProjectDataOrder[0].length -1))
	}, [hoverCardIdx])

	console.log("restCardWidth", restCardWidth)

	return (
		<div className="relative w-full">
			{
				ProjectDataOrder[0].map((projectId, i) => 
					<div key={i} ref={el => {cardsRef.current[i] = el}}
						className={
							`group relative justify-end h-full ${activeIdx === i ? "active" : ""} overflow-clip float-left block transition-all cursor-pointer`
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
						<div className="absolute z-10 flex flex-col items-center justify-end p-2 bg-[#1a1a1ab5] text-white text-2xl font-bold" style={{
							width: cardWidth,
							height: cardHeight,
							display: activeIdx === i ? "flex" : "none",
							background: "linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 10%)",
							zIndex: 2
						}}>
							<p>{ProjectData[projectId].title}</p>
						</div>
						<div className="absolute top-0 right-0 w-full" style={{
							height: cardHeight,
							display: activeIdx === i ? "none" : "block",
							background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%)",
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
					</div>
				)
			}
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
		<main className="w-full flex flex-col p-8">
			<div className="p-10 flex flex-col gap-2 items-center justify-center">
				<h1 className="font-bold text-2xl">Works</h1>
			</div>
			<ProjectList />
		</main>
	);
}
