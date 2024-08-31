"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData, ProjectDataOrder } from "@/app/data/projects"

import arrow_pointer from "@/public/icons/thick_arrow.svg"

import demoImg from "@/public/works/asset_01.png"
import { StaticImageData } from "next/image";

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
        <div className="flex flex-row grow border-2 border-[#212121] border-solid">
          <button ref={workSwitchWABtn} className={`min-w-0 hocus:bg-accent grow basis-1/2 p-2 px-4 font-bold [&.active]:bg-[#212121] [&.active]:text-white transition-colors ${workSwitchState === 0 ? "active" : ""} whitespace-nowrap`}>Web application</button>
          <button ref={workSwitchDJBtn} className={`min-w-0 hocus:bg-accent grow basis-1/2 p-2 px-4 font-bold [&.active]:bg-[#212121] [&.active]:text-white transition-colors ${workSwitchState === 1 ? "active" : ""} whitespace-nowrap`}>Data journalism</button>
        </div>
      </div>
      {
        ["WEB APPLICATION", "DATA JOURNALISM"].map((projectType, i) => {
          return (
            <div key={i} className={`flex-col items-stretch gap-4 [&.active]:flex hidden ${workSwitchState === i ? "active" : ""}`}>
              <h2 className="font-bold text-lg -mb-2">{projectType}</h2>
              {
                ProjectDataOrder[i].map((projectId, j) => {
                  return (
                    <div key={j} className="w-full min-h-64 flex flex-row items-stretch border-2 border-black border-solid">
                      <div className="basis-1/2 shrink">
                        <img className="h-full min-w-[auto]" src={demoImg.src}/>
                      </div>
                      <div className="flex flex-col grow p-4 bg-white">
                        <h3 className="font-bold text-2xl">{ProjectData[projectId].title}</h3>
                        <p>{ProjectData[projectId].synopsis}</p>
                        <p className="font-bold pt-3">Learning points</p>
                        <ul className="list-disc pl-5 pb-5">
                          {
                            ProjectData[projectId].learning_points.map((lp, k) => {
                              return (
                                <li key={k}>
                                  {lp}
                                </li>
                              )
                            })
                          }
                        </ul>
                        <div className="flex gap-2 self-end mt-auto">
                          {
                            ProjectData[projectId].ext_link_demo != null ? <a className="font-bold p-2 border-2 border-black border-solid" href={ProjectData[projectId].ext_link_demo}>TRY</a> : ""
                          }
                          <a className="font-bold text-white p-2 bg-accent border-2 border-black border-solid" href={`/works/${projectId}`}>MORE</a>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>  
          )
        })
      }
    </main>
  );
}
