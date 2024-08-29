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

  return (
    <main className="w-full flex flex-col items-center">
      <h1 className="font-bold text-2xl mt-6">Works</h1>
      <div className="flex flex-col items-stretch p-4">
      </div>
    </main>
  );
}
