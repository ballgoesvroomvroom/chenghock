"use client";

import { usePathname } from "next/navigation";
import { Context, createContext, Dispatch, SetStateAction, use, useContext, useEffect, useRef, useState } from "react";
import "./topbar.css"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

export const INITIAL_TOPBAR_HT = 56

export const TopbarContext: Context<{topbarHt: number, setTopbarHt?: Dispatch<SetStateAction<number>>, forceTopbarScrollState: boolean, setForceTopbarScrollState?: Dispatch<SetStateAction<boolean>>}> = createContext({ topbarHt: INITIAL_TOPBAR_HT, forceTopbarScrollState: false as boolean })

export function TopbarContextProviderWrapper({ children }: { children: React.ReactNode }) {
  const [topbarHt, setTopbarHt] = useState(INITIAL_TOPBAR_HT);
  const [forceTopbarScrollState, setForceTopbarScrollState] = useState(false);
  return (
    <TopbarContext.Provider value={{
      topbarHt, setTopbarHt,
      forceTopbarScrollState, setForceTopbarScrollState
    }}>
      <TopbarComponent />
      {children}
    </TopbarContext.Provider>
  )
}

function TopbarComponent() {
  const topbarRef = useRef<HTMLDivElement>(null)
  const { topbarHt, setTopbarHt, forceTopbarScrollState, setForceTopbarScrollState } = useContext(TopbarContext)

  const pathName = usePathname();

  useEffect(() => {
    if (!topbarRef.current || !setTopbarHt) {
      return
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setTopbarHt(entry.contentRect.height)
      }
    })

    resizeObserver.observe(topbarRef.current)
    return () => resizeObserver.disconnect();
  }, [])

  let [topbarScrolled, setTopbarScrolled] = useState(false)
  useEffect(() => {
    const windowScrollUpdate = () => {
      if (!topbarRef.current || forceTopbarScrollState) {
        return
      }

      setTopbarScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", windowScrollUpdate)
    setTopbarScrolled(window.scrollY > 0)

    return () => window.removeEventListener("scroll", windowScrollUpdate)
  }, [topbarScrolled])

  return (
    <div ref={topbarRef} id="topbar-window" className={`flex justify-between items-stetch bg-primary sticky top-0 z-50 border-solid border-black [&.scrolled]:border-b-2 ${topbarScrolled === true || forceTopbarScrollState ? "scrolled" : ""} duration-100 ease-in-out`} style={{transitionProperty: "border-bottom-color"}}>
      <a href="/"><p className="p-2 px-4 md:p-4 md:px-8 font-bold">CHONG CHENG HOCK</p></a>
      <nav className="basis-1/2 max-w-80 flex justify-between">
        <a href="/about" className={`relative ${pathName === "/about" ? "active" : ""} p-2 md:p-4 hacus:font-bold flex justify-center items-center`}><p>About</p><img src={arrow_pointer.src} className="hidden absolute bottom-0 left-1/2 w-3 h-3 rotate-180 -translate-x-1/2" /></a>
        <a href="/works" className={`relative ${pathName === "/works" ? "active" : ""} p-2 md:p-4 hacus:font-bold flex justify-center items-center`}><p>Works</p><img src={arrow_pointer.src} className="hidden absolute bottom-0 left-1/2 w-3 h-3 rotate-180 -translate-x-1/2" /></a>
        <a href="/contact" className={`relative ${pathName === "/contact" ? "active" : ""} p-2 md:p-4 hacus:font-bold flex justify-center items-center`}><p>Contact</p><img src={arrow_pointer.src} className="hidden absolute bottom-0 left-1/2 w-3 h-3 rotate-180 -translate-x-1/2" /></a>
      </nav>
    </div>
  );
}