"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import graphic_fish from "@/public/graphics/fish.svg"
import graphic_prawn from "@/public/graphics/prawn_2.svg"

import js_logo from "@/public/ext_logos/javascript.png"
import ts_logo from "@/public/ext_logos/typescript.png"
import lua_logo from "@/public/ext_logos/lua.png"
import kotlin_logo from "@/public/ext_logos/kotlin.png"
import cpp_logo from "@/public/ext_logos/cpp.png"
import python_logo from "@/public/ext_logos/python.png"
import dax_logo from "@/public/ext_logos/dax.png"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

const BUBBLE_SIZE = [24, 18, 12] // in pixels
const BUBBLE_COUNT = 20
const BUBBLE_LEFT_OFFSET = `${Math.random() *50}px`

const SKILLS_DATA: Array<{image: StaticImageData, title: string, description: string}> = [
  {
    "image": dax_logo,
    "title": "Data Analysis Expressions",
    "description": "Hello"
  },
  {
    "image": js_logo,
    "title": "Javascript",
    "description": "Hello"
  },
  {
    "image": ts_logo,
    "title": "Typescript",
    "description": "Hello"
  },
  {
    "image": cpp_logo,
    "title": "C++",
    "description": "Hello"
  },
  {
    "image": kotlin_logo,
    "title": "Kotlin",
    "description": "Hello"
  },
  {
    "image": python_logo,
    "title": "Python",
    "description": "Hello"
  },
  {
    "image": lua_logo,
    "title": "Lua",
    "description": "Hello\nByebye\nLOL"
  }
].map(e => {
  e.description = e.description.split("\n").map(line => `<p>${line}</p>`).join("")
  return e
})

export default function Home() {
  const { topbarHt } = useContext(TopbarContext)

  const bubbleWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const windowScrollUpdate = () => {
      if (!bubbleWindowRef.current) {
        return
      }

      let scrollY = window.scrollY
      let windowHt = window.innerHeight

      let lerp = Math.min(scrollY /windowHt, 1) // [0, 1], should be at 1 when scroll through first page (height of 100svh)
      let bubbleWindowChildren = bubbleWindowRef.current.children as HTMLCollectionOf<HTMLElement>
      for (let bubbleElement of bubbleWindowChildren) {
        let r: number = parseFloat(bubbleElement.getAttribute("data-r") ?? "0")
        bubbleElement.style.transform = `translateY(-${((r +.2) *2 *lerp) *100}px)`
      }
    }

    window.addEventListener("scroll", windowScrollUpdate)
    windowScrollUpdate()

    return () => window.removeEventListener("scroll", windowScrollUpdate)
  }, [])

  const [skillSelectionIdx, setSkillSelectionIdx] = useState(0)
  const skillSelectionRef = useRef<Array<HTMLButtonElement|null>>([])
  const skillTitleRef = useRef<HTMLDivElement>(null)
  const skillDescriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!skillSelectionRef.current || skillSelectionRef.current.length === 0) {
      return
    }

    let cbMap = [] // store callback function to be removed on clean-up
    for (let i = 0; i < skillSelectionRef.current.length; i++) {
      let skillSelect = skillSelectionRef.current[i]
      cbMap[i] = (e: Event) => {
        setSkillSelectionIdx(i)
      }

      skillSelect?.addEventListener("click", cbMap[i])
    }

    return () => {
      for (let i = 0; i < skillSelectionRef.current.length; i++) {
        skillSelectionRef.current[i]?.removeEventListener("click", cbMap[i])
      }
    }
  }, [skillSelectionRef])

  useEffect(() => {
    // re-render contents of description
    if (!skillTitleRef.current || !skillDescriptionRef.current) {
      return
    }

    skillTitleRef.current.innerHTML = SKILLS_DATA[skillSelectionIdx].title
    skillDescriptionRef.current.innerHTML = SKILLS_DATA[skillSelectionIdx].description
  }, [skillSelectionIdx])

  return (
    <main>
      <section id="landing" className={`p-8 flex-col gap-8 md:flex-row grow flex md:items-center justify-between bg-contain bg-no-repeat bg-center`} data-ht={topbarHt} style={{height: `calc(100svh - ${topbarHt}px)`, backgroundImage: `url(${graphic_fish.src})`}}>
          <div className="basis-1/2">
            <h1 className="text-4xl md:text-6xl font-bold" style={{lineHeight: "1.1"}}>HELLO, I AM<br /><span data-stroke="CHENG HOCK" className="text-accent text-stroke-black text-5xl md:text-8xl stroke-width" style={{letterSpacing: "3px"}}>CHENG HOCK</span></h1>
            <p className="pt-6">Welcome to aquarium for my projects! （。＾▽＾）</p>
          </div>
          <div className="flex flex-col items-end md:items-start gap-3 justify-end grow shrink basis-1/2 min-h-0">
            <h2 className="font-bold text-2xl text-stroke-bg" data-stroke="Full Stack Web Application Developer + Data Analyst">Full Stack Web Application Developer + Data Analyst</h2>
            <div id="imageContainer" className="min-h-0 grow">
              <figure id="imageFrame" className="border-2 border-black aspect-video h-auto max-w-full">
                <img className="h-full w-full" src={demoImg.src} style={{"boxShadow": "-4px 4px 0 2px #000"}} />
              </figure>
            </div>
          </div>
          <div className="hidden md:block absolute w-full left-0 -z-10" style={{top: `calc(100% - 200px)`, height: "400px"}}>
            <div ref={bubbleWindowRef} className="relative w-full h-full overflow-x-clip">
              {
                Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
                  let r = Math.random()
                  let bubbleSize = `${BUBBLE_SIZE[Math.floor(r *3)]}px`
                  return (
                    <div key={i} data-r={r} suppressHydrationWarning={true} className="absolute left-0 top-0 transition-transform bg-black rounded-full" style={{top: `${r *100}%`, left: `calc(${i /BUBBLE_COUNT *100}% + ${BUBBLE_LEFT_OFFSET})`, width: bubbleSize, height: bubbleSize}}>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
        {/* 
        // @ts-ignore */}
        <section className={`flex flex-col p-8 z-10 min-h-[var(--ht)] md:h-[var(--ht)]`} style={{"--ht": `calc(100svh - ${topbarHt}px)`, paddingTop: "50px"}}>
          <h2 className="text-2xl font-bold pb-4">MY SKILLS AND EXPERTISE<span className="pl-2 font-normal text-base"> (in chronological order)</span></h2>
          <div className="flex flex-col grow min-h-0 gap-4 md:flex-row">
            <div id="languages-container" className="shrink w-full bg-primary grid grid-cols-3 sm:grid-cols-5 md:grid-cols-4 h-min">
              {
                SKILLS_DATA.map((data, i) => {
                  return (
                    <button key={i} ref={el => {skillSelectionRef.current[i] = el}} className={`group relative aspect-square w-full border-solid border-2 border-gray-200 flex justify-center items-center cursor-pointer focus:outline-none hacus:border-black hacus:z-[2] hacus:bg-white hacus:stroke saturate-0 hacus:filter-none transition-colors aspect-square ${skillSelectionIdx === i ? "active" : ""}`}>
                      <img src={data.image.src} className="w-full h-full" />
                      <img src={arrow_pointer.src} className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 transition-opacity group-[.active]:opacity-100 opacity-0" />
                    </button>
                  )
                })
              }
            </div>
            <div className="flex flex-col w-full grow min-h-0 bg-primary border-black border-2 border-solid">
              <div className="border-black border-b-2 border-solid p-2 bg-white">
                <p ref={skillTitleRef} className="font-bold text-lg">Python</p>
              </div>
              <div id="stats-card" className="flex flex-row bg-primary border-black border-b-2 border-solid">
                {
                  [["Expert", "30+", "7+"]].map((data, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="flex flex-col grow gap-2 p-4 border-solid border-black border-r-[1px]">
                          <p className="text-lg">Proficiency</p>
                          <p className="font-bold text-4xl">{data[0]}</p>
                          <div className="flex flex-row basis-2 shrink-0 grow-0 h-full border-solid border-black border-[1px] gap-[1px]">
                            <div className="grow bg-accent">
                            </div>
                            <div className="grow bg-accent">
                            </div>
                            <div className="grow bg-accent">
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col grow gap-2 p-4 border-solid border-r-black border-r-[1px]">
                          <p className="text-lg">Projects</p>
                          <p className="font-bold text-4xl">{data[1]}</p>
                        </div>
                        <div className="flex flex-col grow gap-2 p-4">
                          <p className="text-lg">Years</p>
                          <p className="font-bold text-4xl">{data[2]}</p>
                        </div>
                      </Fragment>
                    )
                  })
                }
              </div>
              <div ref={skillDescriptionRef} className="grow p-2 pt-4 [&>p]:pb-2 overflow-y-auto">
                <p>What started as a hobby when transitioning from the Roblox game engine soon became a burning desire to write scripts and programs to automate tasks.</p>
                <p>First started off with CRUD apps with the CLI as an interface. There were many things I could do. Such as interacting with database services to port data to and from in order to sync data.</p>
                <p>I got the opportunity to leverage on my Python skills for my national examinations (GSCE O-Levels). This also gave me room to develop and refine my Python knowledge further.</p>
                <p>I then started diving into different use cases, such as web scraping, web server development,exploratory data understanding, and machine learning much later on.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center items-center p-8 z-10" style={{paddingTop: "50px", height: `calc(100svh - ${topbarHt}px)`}}>
          <h2 className="text-2xl font-bold">MY WORKS</h2>
        </section>
        <section className="flex flex-col p-8 z-10 bg-contain bg-no-repeat bg-right" style={{paddingTop: "100px", height: `calc(100svh - ${topbarHt}px)`, backgroundImage: `url(${graphic_prawn.src})`}}>
          <section className="[&>p]:pb-2 max-w-[50%]">
            <h2 className="text-2xl font-bold pb-4">REACH OUT TO ME</h2>
            <p>I'd be happy to accept any form of feedback or guidance you have to offer <span>me. :)</span></p>
            <p>I am readily contactable at hi@chenghock.com<br />Alternatively, I keep my Telegram open at t.me/chenghock</p>
            <p>Looking forward to our connection!</p>
          </section>
          <section className="max-w-1/2 mt-[200px]">
            <h2 className="text-2xl font-bold pb-4">MY SOCIALS</h2>
            <div className="grid gap-5">
            </div>
          </section>
        </section>
    </main>
  );
}
