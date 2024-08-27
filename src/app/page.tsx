"use client"

import { TopbarContext } from "./components/topbar/topbar";
import { useContext, useEffect, useRef } from "react";

import js_logo from "@/public/ext_logos/javascript.png"
import ts_logo from "@/public/ext_logos/typescript.png"
import lua_logo from "@/public/ext_logos/lua.png"
import kotlin_logo from "@/public/ext_logos/kotlin.png"
import cpp_logo from "@/public/ext_logos/cpp.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

const BUBBLE_SIZE = [24, 18, 12] // in pixels
const BUBBLE_COUNT = 20
const BUBBLE_LEFT_OFFSET = `${Math.random() *50}px`

const SKILLS_DATA: Array<{image: StaticImageData, title: string, description: string}> = [
  {
    "image": js_logo,
    "title": "Javascript",
    "description": "Hello"
  }
]

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

    return () => window.removeEventListener("scroll", windowScrollUpdate)
  }, [])

  return (
    <main>
      <section id="landing" className="p-8 flex-col gap-8 md:flex-row grow flex md:items-center justify-between" data-ht={topbarHt} style={{height: `calc(100svh - ${topbarHt}px)`}}>
          <div className="basis-1/2 z-10">
            <h1 className="text-6xl font-bold leading-loose">HELLO, I AM<br /><span className="text-accent text-stroke-black text-8xl">CHENG HOCK</span></h1>
          </div>
          <div className="flex flex-col items-end md:items-start gap-3 justify-end grow shrink basis-1/2 min-h-0 z-10">
            <h2 className="font-bold text-2xl">Full stack web application developer</h2>
            <div id="imageContainer" className="min-h-0 grow">
              <figure id="imageFrame" className="border-2 border-black aspect-video h-full">
                <img className="h-full w-full" src={demoImg.src} style={{"boxShadow": "-4px 4px 0 2px #000"}} />
              </figure>
            </div>
          </div>
          <div className="hidden md:block absolute w-full left-0" style={{top: `calc(100% - 200px)`, height: "400px"}}>
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
        <section className="p-8 z-10" style={{paddingTop: "50px", height: `calc(100svh - ${topbarHt}px)`}}>
          <h2 className="text-2xl font-bold">MY SKILLS AND EXPERTISE<span className="pl-2 font-normal text-base"> (in chronological order)</span></h2>
          <div id="languages-container">
            {
              SKILLS_DATA.map(data => {
                return (
                  <div className="hover:bg-white hover:stroke saturate-0 hover:filter-none transition-colors min-w-0">
                    <img src={data.image.src} style={{width: "auto", height: "214px", aspectRatio: 1}} />
                  </div>
                )
              })
            }
          </div>
        </section>
    </main>
  );
}
