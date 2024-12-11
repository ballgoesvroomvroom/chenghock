"use client"

import { SocialsContainer } from "@/app/components/socials"
import { TopbarContext } from "@/app/components/topbar/topbar"
import { useContext, useEffect, useRef, useState } from "react";

import { ProjectData, ProjectDataOrder } from "@/app/data/projects";
import { TechStack as TechStackData, Group as TechStackGroup, GroupColor as TechStackGroupColor, TotalOrder as TechStackGroupOrder } from "@/app/data/techstack";

import { MapPin } from "@phosphor-icons/react"
import headshot from "@/public/graphics/headshot_square.jpg"

function LeftColumn() {
	return (
		<div className="flex flex-col basis-[var(--ht)] md:basis-1/3 h-full grow md:shrink-0 md:border-r-2 md:border-black md:border-solid">
			<div className="p-6">
				<h1 className="font-bold text-5xl pb-4">I am a student</h1>
				<p className="text-xl">Diploma in Applied AI & Analytics @ Nanyang Polytechnic.</p>
			</div>
			<div className="grow shrink border-black border-solid border-t-2 border-b-2 min-h-0">
				<img className="w-full h-full object-cover" src={headshot.src} />
			</div>
			<div className="flex flex-col w-full self-end p-4">
				<SocialsContainer iconSize={54} />
			</div>
		</div>
	)
}

function TechStack() {
	const [currentIdx, setCurrentIdx] = useState<null | number>(0)
	const currentToggledIdxRef = useRef<null | number>(0)

	return (
		<div className="flex flex-col gap-6">
			<div className="-mt-2">
				{
					TechStackGroup.map((key, i) =>
						<button key={i} className="px-2 rounded mr-2 mt-2 float-left transition-colors" style={{
							backgroundColor: currentIdx === i ? TechStackGroupColor[i] : "#1a1a1a1a"
						}} onClick={() => {
							currentToggledIdxRef.current = i
							setCurrentIdx(i)
						}} onMouseEnter={() => {
							setCurrentIdx(i)
						}} onMouseLeave={() => {
							if (currentToggledIdxRef.current !== i) {
								// not clicked
								setCurrentIdx(null)
							}
						}}>{key}</button>
					)
				}
			</div>
			<div className="-mt-8">
				{
					TechStackGroupOrder.map((key, i) =>
						<button key={i} className="flex flex-row gap-2 items-center mr-4 mt-8 float-left" onClick={() => {
							currentToggledIdxRef.current = key[0]
							setCurrentIdx(key[0])
						}} onMouseEnter={() => {
							setCurrentIdx(key[0])
						}} onMouseLeave={() => {
							console.log("Left", currentToggledIdxRef.current, key[0])
							if (currentToggledIdxRef.current !== key[0]) {
								// not clicked
								setCurrentIdx(currentToggledIdxRef.current)
							}
						}}>
							<img src={TechStackData[TechStackGroup[key[0]]][key[1]][0].src} className="transition-colors h-16 md:h-8 lg:h-12" style={{
								"transitionProperty": "filter",
								"filter": `saturate(${currentIdx === key[0] ? 1 : 0})`
							}} />
							<p style={{
								"fontWeight": currentIdx === key[0] ? "700" : "400"
							}}>{key[1]}</p>
						</button>
					)
				}
			</div>
		</div>
	)
}

function MiddleColumn() {
	const hScrollContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!hScrollContainerRef.current) {
			return
		}

		const scrollUpdate = (e: WheelEvent) => {
			// e.preventDefault();
			// console.log(e.deltaY)
			// if (hScrollContainerRef.current) {
			// 	hScrollContainerRef.current.scrollLeft += e.deltaY;

			// 	// @ts-ignore
			// 	let childWidth = hScrollContainerRef.current.children[0].offsetWidth
			// 	console.log(hScrollContainerRef.current.scrollLeft, childWidth)
			// 	if (hScrollContainerRef.current.scrollLeft >= childWidth) {
			// 		let last = hScrollContainerRef.current.children[hScrollContainerRef.current.children.length -1]
			// 		let childrenHiddenCount = Math.floor(hScrollContainerRef.current.scrollLeft /childWidth)
			// 		console.log("childrenHiddenCount", childrenHiddenCount)
			// 		for (let i = 0; i < childrenHiddenCount; i++) {
			// 			last.after(hScrollContainerRef.current.children[0])
			// 		}

			// 		hScrollContainerRef.current.scrollLeft -= childWidth *childrenHiddenCount
			// 	}
			// }
		}

		hScrollContainerRef.current.addEventListener("wheel", scrollUpdate);

		return () => {
			hScrollContainerRef.current?.removeEventListener("wheel", scrollUpdate)
		}
	}, [hScrollContainerRef])

	return (
		<div className="md:h-full md:overflow-y-auto grow-0 shrink-0 min-w-0 basis-1/3 md:border-r-2 md:border-black md:border-solid no-scrollbar">
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">About me</h2>
					<p className="pb-2">I am a <span className="font-bold">full stack web developer</span> currently pursuing a diploma in data analytics.</p>
					<p className="inline-flex items-center gap-2">
						<MapPin size={24} weight="bold" />
						Singapore, since 2018
					</p>
				</div>
			</section>
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">What I am fluent in</h2>
					<TechStack />
				</div>
			</section>
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">From CRUD apps, to Data visualisations, to AI</h2>
					<p className="pb-2">Starting with Python-based CRUD CLI programs, I learned the fundamentals of app development before moving on to building <span className="font-bold">CRUD web apps using vanilla JavaScript and various frameworks</span>.</p>
					<p className="pb-2">My interest in AI grew, leading me to explore its <span className="font-bold">applications in data analytics</span>, which shaped my choice of diploma.</p>
					<p>I’ve since worked with techniques like forecasting, clustering, and neural networks; I’m eager to build the next generation of <span className="font-bold">AI-powered web applications</span>.</p>
				</div>
			</section>
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">Multilingual</h2>
					<p className="pb-2">I find the syntax of the many different programming languages to be quite a beautiful thing to appreciate.</p>
					<p className="pb-2">I am fluent in <span className="font-bold">Javascript</span>, <span className="font-bold">Typescript</span>, <span className="font-bold">Python</span>, and <span className="font-bold">Lua</span>. Mostly working with frameworks to develop <span className="font-bold">full stack web applications</span>.</p>
					<p className="pb-2">I have explored various other languages such as Java (for Hadoop), Kotlin (Android development), Rust and C++ for software development.</p>
					<p className="">In the near future, I would love to expand my language capabilities to build all sorts of things!</p>
				</div>
			</section>
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">Fun facts about me</h2>
					<p className="pb-2">Aside from learning and debugging all day, I love to feast on seafood, with anything involving crabs and fish as my favourite dishes.</p>
					<p className="pb-4 italic">&lt;insert-picture-of-black-pepper-crab-here&gt; 🌶️🌶️</p>
					<p>Otherwise, I also love to plot time for exercises, especially late night jogs 🏃‍♂️</p>
				</div>
			</section>
			<section className="overflow-x-auto border-b-2 border-black border-solid min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">Reach out to me</h2>
					<p className="pb-2">I am easily reachable via email, <a href="mailto:hi@chenghock.com" className="link"	 target="_blank">hi@chenghock.com</a>.</p>
					<p className="pb-2">Alternatively, you may reach out to me on any of my social media platforms.</p>
					<SocialsContainer iconSize={32} />
				</div>
			</section>
			<section className="hidden md:block overflow-x-auto min-w-0">
				<div className="p-4">
					<h2 className="text-3xl font-bold underline decoration-dotted mb-4">View my works</h2>
					<p className="pb-2">On the right panel, view some of my <span className="font-bold italic">*proudest projects*</span> that saw its completion.</p>
					<p className="inline-flex items-center gap-4">View more details here <a href="/works" className="p-2 flex justify-between items-center bg-black-accent text-white rounded">My works</a></p>
				</div>
			</section>
		</div>
	)
}

function RightColumn() {
	return (
		<div className="grow shrink min-w-0 basis-1/3 min-h-0 h-full overflow-y-auto no-scrollbar">
			<div className="p-4">
				<h2 className="text-3xl font-bold">Works</h2>
			</div>
			<div className="flex flex-col">
				{
					ProjectDataOrder.map((projectIds, i) => {
						return projectIds.map((projectId, j) => {
							return (
								<div key={`${i}-${j}`} className="border-solid border-black border-t-2">
									<img src={ProjectData[projectId].coverImg.src} />
									<div className="flex flex-row justify-between p-4 border-solid border-black border-t">
										<div>
											<p className="text-xl">{ProjectData[projectId].title}</p>
											<p className="text-slate-800">{ProjectData[projectId].type === 0 ? "Full stack web application" : "Data journalism"}</p>
										</div>
										<div className="self-end">
											<a className="bg-black-accent rounded p-2 text-white" href={`/works/${projectId}`}>Details</a>
										</div>
									</div>
								</div>
							)
						})
					})
				}
			</div>
		</div>
	)
}

export default function AboutMePage() {
	const { topbarHt, setForceTopbarScrollState } = useContext(TopbarContext)

	useEffect(() => {
		if (!setForceTopbarScrollState) {
			return
		}

		const windowResizeUpdateFn = () => {
			let mq = window.matchMedia("(min-width: 768px)")
			if (mq.matches) {
				setForceTopbarScrollState(true) // force .scrolled state on topbar for this page (for non-mobile users)
			} else {
				setForceTopbarScrollState(false)
			}
		}

		// check for media query status on every resize
		window.addEventListener("resize", windowResizeUpdateFn)
		windowResizeUpdateFn() // initialisation call

		return () => window.removeEventListener("resize", windowResizeUpdateFn)
	}, [setForceTopbarScrollState])

	return (
		// @ts-ignore
		<div className={`flex flex-col md:flex-row min-h-[var(--ht)] md:h-[var(--ht)] w-full justify-start`} style={{"--ht": `calc(100svh - ${topbarHt}px - 2px)`}}>
			<LeftColumn />
			<MiddleColumn />
			<RightColumn />
		</div>
	)
}