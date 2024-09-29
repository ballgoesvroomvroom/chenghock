"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData } from "@/app/data/projects"

import { StaticImageData } from "next/image";
import { notFound } from "next/navigation";

function ProjectDetailBanner({ projectId, isActive }: { projectId: string, isActive: boolean }) {
  return (
    <div className="w-full flex justify-between p-4 gap-4 border-solid border-black border-b-2">
      <div className="">
        <img className="w-full mr-3 w-12 md:w-16 aspect-square min-w-0" src={ProjectData[projectId].logo.src} />
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl">{ProjectData[projectId].title}</h1>
          <p>{ProjectData[projectId].synopsis}</p>
        </div>
      </div>
      <button className="p-2 flex rounded bg-accent text-white self-start">
        <span>Exit</span>
      </button>
    </div>
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
    <div className="flex flex-col-reverse md:flex-row p-4 gap-12 md:max-h-[500px] overflow-auto border-solid border-black border-t-2">
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
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">External links</h2>
          <a className="p-2 rounded text-black-accent hocus:text-white hocus:bg-black-accent border-black-accent border-solid border transition-colors" href={ProjectData[projectId].ext_link_demo} target="_blank">
            <span>Visit site</span>
          </a>
        </div>
      </div>
      <div className="overflow-auto">
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
    <main className="w-full flex flex-col items-center">
      <ProjectDetailBanner projectId={projectId} />
      <img src={ProjectData[projectId].coverImg.src} />
      <ProjectDetailContent projectId={projectId} />
    </main>
  );
}