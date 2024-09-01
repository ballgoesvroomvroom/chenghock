import { StaticImageData } from "next/image"

import demoImg from "@/public/works/asset_01.png"
import demoImg2 from "@/public/works/asset_02.png"

interface ProjectDataType {
  [index: string]: {
    title: string,
    created_on: string,
    type: 0|1,
    status: string,
    synopsis: string,
    learning_points: Array<string>,
    logo: StaticImageData,
    coverImg: StaticImageData,
    technicals: { stack: string, deployment: string, "3rdpartydep": string },
    description: Array<Array<string>>,
    ext_link_demo?: string
  }
}

export const ProjectData: ProjectDataType = {
  "qriller": {
    "title": "Qriller",
    "created_on": "April 2023",
    "type": 0,
    "status": "Refining",
    "ext_link_demo": "https://qriller.com",
    "logo": demoImg2,
    "coverImg": demoImg,
    "technicals": {
      "stack": "Express.js, Firestore, Next.js",
      "deployment": "Bundled with Webpack, served on Ubuntu Droplet with PM2",
      "3rdpartydep": "Google, Stripe, GSAP"
    },
    "synopsis": "Full stack web application for the generation and transacting of Math worksheets.",
    "learning_points": [
      "Use of Webpack to bundle modules and dependencies",
      "Implementing payment services through the use of Stripe as a payment processor and Google Pay as a payment gateway"
    ],
    "description": [
      ["About", "Qriller is a business centered around procedural worksheets. It transacts digital worksheets, alongside its answer sheet, built for students, tutors and teachers.", "Building the interface for Qriller was a stressful albeit meaningful experience. I had learn a lot since the first day of making the website become reality."],
      ["Choice of Technology Stack", "As I had done prior full stack web applications (no longer maintained) with Express.js and Firebase’s NoSQL database - Firestore, it was the tech stack I was most comfortable with.", "I wanted to ship this product out as soon as possible. Consequently, I decided to simply go with vanilla HTML and JS as it was what I was familiar with at that point in time."],
      ["Early Prototypes", "This project has been long overdue as I was juggling my personal responsibilities (school and work commitments), leaving me with limited spare time to work on it. As a full-fledged web application now, packed with all the nice-to-have features, it has came a long way.", "Earyl designs for the worksheets"]
    ]
  },
  "spots": {
    "title": "Spots",
    "created_on": "September 2024",
    "type": 0,
    "status": "Deployed",
    "synopsis": "abc",
    "logo": demoImg2,
    "coverImg": demoImg,
    "learning_points": [
      "coolio"
    ],
    "technicals": {
      "stack": "Next.js, React, PostreSQL, Redis",
      "deployment": "Build and hosted on Vercel",
      "3rdpartydep": "TailwindCSS with DaisyUI plugin, Spotify's API SDK"
    },
    "description": [
      ["About", "Initially started as an interface for the song recommendation I was interested in doing, however the execution of the recommendation did not come into fruition as there was a lack of user data for a hybrid or collaborative filtering approach."]
    ]
  },
  "study": {
    "title": "Singapore Food Resilience Study",
    "created_on": "December 2023",
    "type": 1,
    "status": "Deployed",
    "logo": demoImg2,
    "coverImg": demoImg,
    "technicals": {
      "stack": "Next.js, React, PostreSQL, Redis",
      "deployment": "Build and hosted on Vercel",
      "3rdpartydep": "TailwindCSS with DaisyUI plugin, Spotify's API SDK"
    },
    "synopsis": "A project centered around PowerBI Service for the heavy lifting of data preparation, understanding and visualizations.",
    "learning_points": [
      "Effective story telling through the use of appropriate visualisations",
      "Data journalism concepts such as time series analysis",
      "Using PowerBI Query Editor’s powerful data cleaning and transformation features"
    ],
    "description": [
      ["About", "Initially started as an interface for the song recommendation I was interested in doing, however the execution of the recommendation did not come into fruition as there was a lack of user data for a hybrid or collaborative filtering approach."]
    ]
  }
}

export const ProjectDataOrder: Array<Array<string>> = [
  ["qriller", "spots"],
  ["study"]
]