"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData, ProjectDataOrder, ProjectDataType } from "@/app/data/projects"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

function ProjectList() {
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
					console.log("rect", rect.width)
					setCardWidth(rect.width)
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
			card?.addEventListener("mouseenter", () => {
				if (card.classList.contains("active")) {
					return
				}
				card.style.minWidth = "64px"
			})

			card?.addEventListener("mouseleave", () => {
				if (card.classList.contains("active")) {
					return
				}
				card.style.minWidth = "0"
			})
		}
	}, [cardsRef])


	return (
		<div className="relative flex flex-row justify-start w-full min-w-0 mx-4 my-8"
			ref={containerRef}
		>
			{
				ProjectDataOrder[0].map((projectId, i) => 
					<div key={i} ref={el => {cardsRef.current[i] = el}}
						className={
							`group relative grow p-4 bg-white min-w-0 overflow-clip box-border ${activeIdx === i ? "active" : ""} min-w-0`
						}
						style={{
						flexBasis: activeIdx === i ? "5000px" : "50px",
						minWidth: activeIdx === i ? "auto" : "0",
						// flexGrow: activeIdx === i ? 1 : 0,
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
