"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState, useMemo } from "react";

import { SKILLS_DATA } from "@/app/data/skills";

import graphic_fish from "@/public/graphics/fish.svg"
import graphic_prawn from "@/public/graphics/prawn_2.svg"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import headshot_img from "@/public/graphics/headshot_square.jpg"
import { SocialsContainer } from "@/app/components/socials";

const BUBBLE_SIZE = [24, 18, 12] // in pixels
const BUBBLE_COUNT = 20
const BUBBLE_LEFT_OFFSET = `${3 +Math.random() *50}px`

export default function Home() {
  const { topbarHt } = useContext(TopbarContext)

  const bubbleWindowRef = useRef<HTMLDivElement>(null)
  const headshotImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let bubbleFloated = Math.min(window.scrollY /window.innerHeight, 1) >= .45 // local state, will not float if debounce is set to true
    const windowScrollUpdate = (_: Event | null, force?: boolean) => {
      // force: boolean, if true, will update determined by lerp threshold, ignoring bubbleFloated state
      if (!bubbleWindowRef.current) {
        return
      }

      let scrollY = window.scrollY
      let windowHt = window.innerHeight

      let lerp = Math.min(scrollY /windowHt, 1) // [0, 1], should be at 1 when scroll through first page (height of 100svh)
      let bubbleWindowChildren = bubbleWindowRef.current.children as HTMLCollectionOf<HTMLElement>
      if (lerp >= .45 && (force || bubbleFloated === false)) {
        bubbleFloated = true
        console.log("triggered")
        for (let bubbleElement of bubbleWindowChildren) {
          let r: number = parseFloat(bubbleElement.getAttribute("data-r") ?? "0")
          bubbleElement.style.transform = `translateY(-${((r +.2) *2 *1) *100}px)`
          bubbleElement.style.transitionDelay = `${Math.random() *200}ms`
        }

        if (headshotImgRef.current) {
          console.log("ref added")
          headshotImgRef.current.classList.add("active")
        }
      } else if (lerp < .45 && (force || bubbleFloated === true)) {
        bubbleFloated = false
        console.log("close")
        for (let bubbleElement of bubbleWindowChildren) {
          let r: number = parseFloat(bubbleElement.getAttribute("data-r") ?? "0")
          bubbleElement.style.transform = "unset"
        }

        if (headshotImgRef.current) {
          headshotImgRef.current.classList.remove("active")
        }
      }
    }

    window.addEventListener("scroll", windowScrollUpdate)
    windowScrollUpdate(null, true)

    return () => {
      console.log("clean")
      window.removeEventListener("scroll", windowScrollUpdate)
    }
  }, [bubbleWindowRef])

  return (
    <main>
      {/*
      // @ts-ignore */}
      <section id="landing" className={`p-8 flex-col gap-8 md:flex-row grow flex md:items-center justify-between bg-contain bg-no-repeat bg-center min-h-[var(--ht)] md:h-[var(--ht)]`} style={{"--ht": `calc(100svh - ${topbarHt}px)`, backgroundImage: `url(${graphic_fish.src})`}}>
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
              useMemo(() => Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
                let r = Math.random()
                let bubbleSize = `${BUBBLE_SIZE[Math.floor(r *3)]}px`
                return (
                  <div key={i} data-r={r} suppressHydrationWarning={true} className="absolute left-0 top-0 transition-transform duration-[300ms] ease-out bg-black rounded-full" style={{top: `${r *100}%`, left: `calc(${i /BUBBLE_COUNT *100}% + ${BUBBLE_LEFT_OFFSET})`, width: bubbleSize, height: bubbleSize}}>
                  </div>
                )
              }), [])
            }
          </div>
        </div>
      </section>
      {/* 
      // @ts-ignore */}
      <section className={`relative sm:flex sm:flex-row p-8 min-h-[var(--ht)] sm:h-[var(--ht)] gap-8`} style={{"--ht": `calc(100svh - ${topbarHt}px)`, paddingTop: "50px"}}>
        <div className="z-10 sm::basis-1/2 sm:min-w-0 sm:grow">
          <h2 className="text-2xl font-bold pb-4">ABOUT ME</h2>
          <p className="pb-4">I am a  motivated individual, passionate about developing impactful web applications. The web application is the front face of every story, business, xx. Therefore, I strongly believe designing secure yet functional and accessible web applications is a must-have key skill.</p>
          <p className="pb-4">My latest venture has been interacting with ML models, with my most recent exposure to recommendation engines using cosine similarities.</p>
          <p className="inline-flex items-end gap-4">
            Learn more about me and my passion for web applications here
            <button className="p-2 rounded bg-black-accent text-white whitespace-nowrap"><span>About me</span></button>
          </p>
        </div>
        <div className="absolute top-0 -z-10 opacity-20 sm:relative sm:opacity-100 sm:basis-1/2 sm:grow ml-16 origin-top-left rotate-[10deg]">
          <div id="pictureFrame" className="box-content max-w-[500px] p-2 pb-12 aspect-square bg-white drop-shadow-lg">
            <img ref={headshotImgRef} src={headshot_img.src} className="w-full h-full saturate-0 opacity-0 [&.active]:saturate-100 [&.active]:opacity-100" alt="Picture of me" style={{transitionProperty: "filter, opacity", transitionTimingFunction: "linear", transitionDuration: "5s", transitionDelay: "300ms"}} />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center p-8 z-10" style={{paddingTop: "50px", height: `calc(100svh - ${topbarHt}px)`}}>
        <h2 className="text-2xl font-bold">MY WORKS</h2>
      </section>
      <section className="flex flex-col p-8 z-10 bg-contain bg-no-repeat bg-right-top" style={{paddingTop: "100px", height: `calc(100svh - ${topbarHt}px)`, backgroundImage: `url(${graphic_prawn.src})`}}>
        <section className="[&>p]:pb-2 max-w-[50%]">
          <h2 className="text-2xl font-bold pb-4">REACH OUT TO ME</h2>
          <p>I'd be happy to accept any form of feedback or guidance you have to offer <span>me. :)</span></p>
          <p>I am readily contactable at <a href="mailto:hi@chenghock.com" className="link" target="_blank">hi@chenghock.com</a>.<br />Alternatively, I keep my Telegram open at <a href="https://t.me/chenghock" className="link" target="_blank">t.me/chenghock</a>.</p>
          <p>Looking forward to our connection!</p>
        </section>
        <section className="max-w-1/2 mt-[200px]">
          <h2 className="text-2xl font-bold pb-4">MY SOCIALS</h2>
          <SocialsContainer iconSize={84} />
        </section>
      </section>
    </main>
  );
}
