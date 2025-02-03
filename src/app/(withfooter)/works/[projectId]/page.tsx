"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { ProjectData } from "@/app/data/projects"

import { useContext, useEffect, useRef, Fragment, useState, MouseEventHandler, WheelEventHandler, SetStateAction, Dispatch } from "react";
import { notFound } from "next/navigation";
import { ArrowsIn, ArrowsOut } from "@phosphor-icons/react";
import { StaticImageData } from "next/image";

function ProjectDetailBanner({ projectId }: { projectId: string }) {
	return (
		<div className="w-full flex flex-col p-4 gap-2 border-solid border-black border-b-2">
			<a href="/works" className="group inline-flex items-center gap-2 font-bold text-2xl text-accent">
				<svg version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
					<path d="m10.396 8.3955 1.6035 1.6035-6 6.002 6 6.002-1.6035 1.6035-7.6035-7.6055z" fill="currentColor"/>
					<path d="m5 14.865v2.2695h25v-2.2695z"
						fill="currentColor"
						fillRule="evenodd"
						style={{paintOrder: "markers stroke fill"}}
						className="transition-transform scale-x-75 group-hover:scale-x-100 origin-left"
					/>
				</svg>
				Back
			</a>
			<div className="flex items-center gap-3">
				<img className={`w-12 md:w-16 aspect-square min-w-0 ${ProjectData[projectId].logo.border ? "border border-black" : ""}`} src={ProjectData[projectId].logo.src} />
				<div className="flex flex-col grow">
					<h1 className="font-bold text-4xl">{ProjectData[projectId].title}</h1>
					<p>{ProjectData[projectId].synopsis}</p>
				</div>
			</div>
		</div>
	)
}

function ProjectImageModal({ currentImage, isOpen, setIsOpen }: { currentImage?: StaticImageData, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (!dialogRef.current) {
			return
		}

		if (isOpen) {
			dialogRef.current.showModal()
		} else {
			dialogRef.current.close()
		}
	}, [isOpen])

	return (
		<dialog ref={dialogRef} className="w-full max-w-svw h-svh m-0 backdrop:opacity-25 hacus:outline-none backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true" style={{
			maxHeight: "100svh",
			backgroundColor: "#ffffffed"
		}}>
			<div className="fixed flex flex-col gap-2 justify-center items-center z-10 w-full h-full min-w-0">
				{ currentImage != null && <img className="w-full border-y-2 border-black border-solid object-contain" src={currentImage.src} /> }
				<button className="group self-end mr-2 inline-flex flex-row items-center gap-1 p-1 px-2 bg-black rounded-md text-white h-min opacity-75 hacus:opacity-100 transition-opacity" onClick={() => {
					setIsOpen(false)
				}}>
					<span>Minimise</span>
					<ArrowsIn size={20} className="origin-center scale-90 transition-transform group-hover:scale-100 group-focus:scale-100" />
				</button>
			</div>
		</dialog>
	)
}

function ProjectShowcaseSlideshow({ projectId }: { projectId: string }) {
	const carouselRef = useRef<HTMLDivElement>(null)
	const [carouselIdx, setCarouselIdx] = useState(0)
	const carouselNextRef = useRef(carouselIdx +1)

	const [isModalOpen, setIsModalOpen] = useState(false)

	let ignoreScroll = useRef(false)
	let lastInteracted = useRef(0)

	const scroll = (e: React.WheelEvent<HTMLDivElement>) => {
		if (!carouselRef.current || !ProjectData[projectId].supplImg || ignoreScroll.current) {
			return
		}
		
		let rect = carouselRef.current.getBoundingClientRect()
		let newIdx = Math.floor(carouselRef.current.scrollLeft /rect.width)
		if (newIdx !== carouselIdx) {
			lastInteracted.current = +new Date();
			setCarouselIdx(newIdx)
			// carouselNextRef.current = (newIdx +1) %(ProjectData[projectId].supplImg.length +1)
		}
	}

	if (ProjectData[projectId].supplImg) {
		useEffect(() => {
			if (!carouselRef.current || !ProjectData[projectId].supplImg) {
				return
			}

			// scroll to content
			let rect = carouselRef.current.getBoundingClientRect()
			carouselRef.current.scrollLeft = carouselIdx *rect.width

			// set next target
			carouselNextRef.current = (carouselIdx +1) %(ProjectData[projectId].supplImg.length +1)
		}, [carouselIdx])

		useEffect(() => {
			if (!carouselRef.current || !ProjectData[projectId].supplImg) {
				return
			}

			let intervalId = setInterval(() => {
				if (!carouselRef.current || !ProjectData[projectId].supplImg || +new Date() -lastInteracted.current <= 2000 || isModalOpen) {
					// give 2s of no user interactivity before auto scrolling
					// OR, dont scroll when modal is open
					return
				}

				ignoreScroll.current = true
				setCarouselIdx(carouselNextRef.current)
				setTimeout(() => ignoreScroll.current = false, 1000)
			}, 5000)

			return () => {
				clearInterval(intervalId)
			}
		}, [carouselRef, isModalOpen])
	}

	return (
		<>
			<ProjectImageModal currentImage={carouselIdx === 0 ? ProjectData[projectId].coverImg : (ProjectData[projectId].supplImg ? ProjectData[projectId].supplImg[carouselIdx -1] : undefined )} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			<div className="relative">
				<div
					className="relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar max-h-96"
					onScroll={scroll}
					ref={carouselRef}
				>
					<img className="snap-start object-cover" src={ProjectData[projectId].coverImg.src} />
					{
						ProjectData[projectId].supplImg && ProjectData[projectId].supplImg.map((img, i) => 
							<img key={i} className="snap-start object-cover" src={img.src} />
						)
					}
					<div className="flex flex-col justify-end sticky right-2 z-10">
						<button className="group inline-flex flex-row items-center gap-1 p-1 px-2 bg-black rounded-t-md text-white h-min opacity-75 hacus:opacity-100 transition-opacity" onClick={() => {
							setIsModalOpen(true)
						}}>
							<span>Expand</span>
							<ArrowsOut size={20} className="origin-center scale-90 transition-transform group-hover:scale-100 group-focus:scale-100" />
						</button>
					</div>
				</div>
				{
					ProjectData[projectId].supplImg && (
						<div className="absolute bottom-0 left-0 w-full h p-4 flex justify-center items-end">
							<div className="relative flex gap-2">
								{
									[...Array(ProjectData[projectId].supplImg.length +1)].map((_, i) => 
										<div key={i} className="w-2 h-2 rounded-full bg-[rgba(150,150,150,.4)]"></div>
									)
								}
								<div className="absolute top-0 left-0 w-2 h-2 rounded-full transition-transform" style={{
									backgroundColor: ProjectData[projectId].accentColor,
									transform: `translateX(${carouselIdx *16}px)`,
								}}>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</>
	)
}

function ProjectDetailContent({ projectId }: { projectId: string }) {
	const [activeSection, setActiveSection] = useState("#content-0")


	// detech when window.location.hash change for anchor links jumping and active content list styling
	useEffect(() => {
		const updateHash = () => {
			let newHash = window.location.hash

			if (newHash.length === 0) {
				// no hash
				newHash = "#content-0"
			} else {
				setActiveSection(newHash)
			}
		}

		window.addEventListener("hashchange", updateHash)

		return () => window.removeEventListener("hashchange", updateHash)
	}, [])

	return (
		<div className="w-full flex flex-col-reverse md:flex-row p-4 gap-12 md:max-h-[750px] overflow-auto border-solid border-black border-t-2">
			<div id="content-left-window" className="flex flex-col mr-8">
				<nav className="flex flex-col whitespace-nowrap pb-14">
					{
						ProjectData[projectId].description.map((sectionContent, i) => {
							let anchorRef = `#content-${i}`

							return (
								<a key={i} className={`${anchorRef === activeSection ? "active" : ""} inline-flex flex-row gap-3 font-bold text-gray-400 [&.active]:text-black`} href={anchorRef}>
									<div className="basis-[2px] shrink-0 grow-0 bg-current transition-colors"></div>
									<span>{sectionContent[0]}</span>
								</a>
							)
						})
					}
				</nav>
				{
					ProjectData[projectId].ext_link_demo && (
						<div className="flex flex-col gap-4">
							<h2 className="font-bold text-2xl">External links</h2>
							<a className="p-2 rounded text-black-accent hocus:text-white hocus:bg-black-accent border-black-accent border-solid border transition-colors" href={ProjectData[projectId].ext_link_demo} target="_blank">
								<span>Visit site</span>
							</a>
						</div>
					)
				}
			</div>
			<div className="overflow-auto scroll-smooth">
				{
					ProjectData[projectId].description.map((sectionContent, i) => {
						return (
							<section key={i} id={`content-${i}`} className="pb-8">
								<h2 className="font-bold text-2xl pb-4">{sectionContent[0]}</h2>
								{
									sectionContent.map((paraContent, j) => {
										if (j === 0) {
											return // skip first element (section header)
										}

										return (
											<p key={j} className="pb-2">{paraContent}</p>
										)
									})
								}
							</section>
						)
					})
				}
			</div>
		</div>
	)
}

export default function DetailedProjectPage({ params }: { params: { projectId: string }}) {
	const { topbarHt } = useContext(TopbarContext)

	// retrieve project details
	const projectId = params.projectId.toLowerCase()
	const projectDetails = ProjectData[projectId]
	if (projectDetails == null) {
		// no match found
		return notFound()
	}

	// populate page
	return (
		<main className="w-full flex flex-col items-center grow">
			<ProjectDetailBanner projectId={projectId} />
			<ProjectShowcaseSlideshow projectId={projectId} />
			<ProjectDetailContent projectId={projectId} />
		</main>
	);
}