"use client";

import { usePathname } from "next/navigation";
import { Context, createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import "./topbar.css"

export const INITIAL_TOPBAR_HT = 56

export const TopbarContext: Context<{topbarHt: number, setTopbarHt?: Dispatch<SetStateAction<number>>}> = createContext({ topbarHt: INITIAL_TOPBAR_HT })

export function TopbarContextProviderWrapper({ children }: { children: React.ReactNode }) {
  const [topbarHt, setTopbarHt] = useState(INITIAL_TOPBAR_HT);
  return (
    <TopbarContext.Provider value={{
      topbarHt, setTopbarHt
    }}>
      <TopbarComponent />
      {children}
    </TopbarContext.Provider>
  )
}

function TopbarComponent() {
  const topbarRef = useRef<HTMLDivElement>(null)
  const { topbarHt, setTopbarHt } = useContext(TopbarContext)

  const [topbarScrolled, setTopbarScrolled] = useState(false)

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

  useEffect(() => {
    const windowScrollUpdate = () => {
      if (!topbarRef.current) {
        return
      }

      setTopbarScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", windowScrollUpdate)
    setTopbarScrolled(window.scrollY > 0)

    return () => window.removeEventListener("scroll", windowScrollUpdate)
  }, [topbarScrolled])

  return (
    <div ref={topbarRef} id="topbar-window" className={`flex justify-between items-center bg-primary sticky top-0 z-50 ${topbarScrolled === true ? "scrolled" : ""}`}>
      <a href="/"><p className="p-4 px-8 font-bold">CHONG CHENG HOCK</p></a>
      <nav className="basis-1/2 max-w-80 flex justify-between">
        <a href="/about" className={`${pathName === "/about" ? "active" : ""} p-4 hover:font-bold`}>About</a>
        <a href="/works" className={`${pathName === "/works" ? "active" : ""} p-4 hover:font-bold`}>Works</a>
        <a href="/contact" className={`${pathName === "/contact" ? "active" : ""} p-4 hover:font-bold`}>Contact</a>
      </nav>
    </div>
  );
}