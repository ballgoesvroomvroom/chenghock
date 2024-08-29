import { StaticImageData } from "next/image"

import js_logo from "@/public/ext_logos/javascript.png"
import ts_logo from "@/public/ext_logos/typescript.png"
import lua_logo from "@/public/ext_logos/lua.png"
import kotlin_logo from "@/public/ext_logos/kotlin.png"
import cpp_logo from "@/public/ext_logos/cpp.png"
import python_logo from "@/public/ext_logos/python.png"
import dax_logo from "@/public/ext_logos/dax.png"

export const SKILLS_DATA: Array<{image: StaticImageData, title: string, description: string}> = [
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
    "description": "Hello"
  }
].map(e => {
  e.description = e.description.split("\n").map(line => `<p>${line}</p>`).join("")
  return e
})