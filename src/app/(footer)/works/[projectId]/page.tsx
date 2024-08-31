"use client"

import { TopbarContext } from "@/app/components/topbar/topbar";
import { useContext, useEffect, useRef, Fragment, useState } from "react";

import { ProjectData } from "@/app/data/projects"

import { StaticImageData } from "next/image";
import { notFound } from "next/navigation";

export default function DetailedProjectPage({ params }: { params: { slug: string }}) {
  const { topbarHt } = useContext(TopbarContext)

  // retrieve project details
  const projectDetails = ProjectData[params.slug.toLowerCase()]
  if (projectDetails == null) {
    // no match found
    return notFound()
  }

  // populate page

  return (
    <main className="w-full flex flex-col items-center">
      <h1 className="font-bold text-2xl mt-6">Works</h1>
      <div className="flex flex-col items-stretch p-4">
      </div>
    </main>
  );
}
