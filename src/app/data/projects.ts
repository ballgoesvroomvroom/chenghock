import { StaticImageData } from "next/image"

import qriller_logo from "@/public/works/asset_02.png"
import qriller_thumb from "@/public/works/asset_01.png"

import bbai_logo from "@/public/works/bbai_logo.png"
import bbai_thumb from "@/public/works/bbai_thumb.png"

import gp_logo from "@/public/works/asset_04.png"
import gp_thumb from "@/public/works/asset_03.png"
import gp_suppl_1 from "@/public/works/asset_05.png"
import gp_suppl_2 from "@/public/works/asset_06.png"

export interface ProjectDataType {
	[index: string]: {
		title: string,
		created_on: string,
		type: 0|1,
		status: string,
		synopsis: string,
		logo: {
			border: boolean,
			src: StaticImageData["src"]
		},
		coverImg: StaticImageData,
		supplImg?: StaticImageData[],
		description: Array<Array<string>>,
		ext_link_demo?: string,
		accentColor: string
	}
}

export const ProjectData: ProjectDataType = {
	"qriller": {
		"title": "Qriller",
		"created_on": "April 2023",
		"type": 0,
		"status": "Refining",
		"ext_link_demo": "https://qriller.com",
		"logo": {
			border: false,
			src: qriller_logo.src
		},
		"coverImg": qriller_thumb,
		"synopsis": "Full stack web application for the generation and transacting of Math worksheets.",
		"description": [
			["About", "Qriller is a web application designed for tutors seeking high-quality teaching materials, allowing them to focus on what they do best—teaching. The platform addresses the critical issue of the lack of accessible and affordable teaching and studying materials. Specifically tailored for GCSE O/N-Levels, Qriller offers a diverse range of procedural worksheets sampled from reputable sources, such as math textbooks and past school exam papers. Tutors can selectively export questions to create customized worksheets, complete with labeled difficulty levels, ensuring that they meet the specific needs of their students. The web app is accessible on various devices, including phones, laptops, and tablets, enabling tutors to work flexibly. Additionally, worksheets can be exported as PDFs for easy printing, and various customization options mimic the appearance of traditional hardcopy worksheets used in schools."],
			["Choice of Tech Stack", "The backend of Qriller is developed using Express.js. The frontend is built with Next.js, utilizing TailwindCSS with DaisyUI for styling and GSAP for animations."],
			["Early Prototypes", "Early prototypes were used to conduct small-scale user testing focused on improving user experience and understanding the user journey. The design went through many iterations."],
			["Challenges", "One of the primary challenges faced during the development of Qriller was designing a functional and intuitive frontend. Without prototyping, creating a cohesive and user-friendly interface was difficult. To overcome this, I shifted to prototyping in Figma, which significantly sped up the development process and ensured a more polished end result."],
			["How I Overcame Those Challenges", "To overcome the challenges of designing the frontend, I utilized Figma to prototype each page in detail. This allowed me to thoughtfully place functional buttons and other elements, streamlining the development of the layout. By planning the design ahead of time, I avoided the inefficiencies of designing on the fly, which made the development process much smoother and more efficient."],
			["My Learning Takeaways", "Working on Qriller provided valuable insights into securing the fulfillment of digital goods, such as worksheets, using payment gateways like Google Pay and processors like Stripe. I learned how to design a secure application with proper access controls, ensuring that users could only access their purchased worksheets. Additionally, I integrated real-world e-commerce functionalities, such as implementing refunds and enforcing a refund policy through code."]
			// ["About", "Qriller is a business centered around procedural worksheets. It transacts digital worksheets, alongside its answer sheet, built for students, tutors and teachers.", "Building the interface for Qriller was a stressful albeit meaningful experience. I had learn a lot since the first day of making the website become reality."],
			// ["Choice of Technology Stack", "As I had done prior full stack web applications (no longer maintained) with Express.js and Firebase’s NoSQL database - Firestore, it was the tech stack I was most comfortable with.", "I wanted to ship this product out as soon as possible. Consequently, I decided to simply go with vanilla HTML and JS as it was what I was familiar with at that point in time."],
			// ["Early Prototypes", "This project has been long overdue as I was juggling my personal responsibilities (school and work commitments), leaving me with limited spare time to work on it. As a full-fledged web application now, packed with all the nice-to-have features, it has came a long way.", "Earyl designs for the worksheets"]
		],
		"accentColor": "#d94444"
	},
	"brainbloomai": {
		"title": "BrainBloomAI",
		"created_on": "September 2024",
		"type": 0,
		"status": "Production",
		"ext_link_demo": "https://github.com/BrainBloomAI",
		"logo": {
			border: true,
			src: bbai_logo.src
		},
		"coverImg": bbai_thumb,
		"synopsis": "A web app that gamifies learning process for PWIDs",
		"description": [
			["About", "BrainBloomAI is a web app designed to help Persons with Intellectual Disabilities (PWIDs) learn proper social etiquette in a safe and fun environment. The app simulates conversational scenarios between the AI and PWIDs, focusing on predefined roles and situations within an employment context. This approach allows users to engage in realistic dialogues, helping them improve their social skills. To keep users engaged, PWIDs can accumulate points after each game, which can be exchanged for badges. The app is endorsed by MINDS (Movement for the Intellectually Disabled of Singapore), where mentors can recommend BrainBloomAI to PWIDs who are struggling socially. The end goal is to empower PWIDs to seamlessly integrate into various social situations with confidence."],
			["Choice of Tech Stack", "The backend of BrainBloomAI was developed using Express.js, which acts as a wrapper over Nvidia's NIM LLM via its API. This provided the language processing capabilities required for dynamic conversational scenarios. On the frontend, Next.js was used to stream audio data to and from Deepgram, a service that handles text-to-speech (TTS) and speech-to-text (SST), allowing real-time interaction. This tech stack was chosen to ensure responsiveness, scalability, and real-time feedback—key components for the app’s success."],
			["Early Prototypes", "Early prototypes of BrainBloomAI were crucial for conducting user testing with PWIDs. The initial feedback showed that the interface was difficult to navigate, leading to a significant change where only one call-to-action element is displayed at any time, simplifying the user experience. Additionally, the game’s difficulty level was adjusted after testers found the spoken playback too challenging; the TTS speed was reduced to make the experience more accessible and enjoyable."],
			["Challenges", "One of the significant challenges in developing BrainBloomAI was the time crunch, as the team was split across different locations, with two members overseas. Coordinating progress under tight deadlines proved difficult. Additionally, this was the first time the team had developed an app specifically for PWIDs, and ensuring the app was both accessible and functional introduced many new challenges."],
			["How I Overcame Those Challenges", "To tackle the time crunch, the team efficiently split the workload into frontend and backend development. Proactive communication ensured that both systems were developed in parallel, allowing for timely completion. As for optimizing the app for PWIDs, we followed accessibility best practices and conducted multiple iterations of user testing to fine-tune the interface and experience, balancing functionality with usability for our target audience."],
			["My Learning Takeaways", "Building BrainBloomAI provided valuable insights into optimizing web applications for PWIDs without compromising on functionality. I also gained experience in streaming audio data between the client and server, an essential feature of the app. Finally, working with a remote team for the first time taught me the importance of clear and concise communication, particularly when coordinating tasks across different time zones."]
		],
		"accentColor": "#fff"
	},
	// "spots": {
	// 	"title": "Spots",
	// 	"created_on": "September 2024",
	// 	"type": 0,
	// 	"status": "Deployed",
	// 	"synopsis": "abc",
	// 	"logo": demoImg2,
	// 	"coverImg": demoImg,
	// 	"description": [
	// 		["About", "Initially started as an interface for the song recommendation I was interested in doing, however the execution of the recommendation did not come into fruition as there was a lack of user data for a hybrid or collaborative filtering approach."]
	// 	]
	// },
	"study": {
		"title": "Singapore Food Resilience Study",
		"created_on": "December 2023",
		"type": 1,
		"status": "Deployed",
		"logo": {
			border: false,
			src: gp_logo.src,
		},
		"coverImg": gp_thumb,
		"supplImg": [gp_suppl_1, gp_suppl_2],
		"synopsis": "A group project centered around PowerBI Service for the heavy lifting of data preparation, understanding and visualizations.",
		"description": [
			["About", "The end product of this group project was a PowerBI report featuring the key metrics used to track local food production in Singapore. Various indicators were employed to track food security. Namely, agriculture orientation index (AOI), local food production (tonnes), farm count, food wastage, and food import weight."],
			["Work Process", "My initial plan was to visualise the trend on Singapore's dependence on food imports. Which could be a key indicator in whether Singapore is striving towards a resilience food supply. Not only that, I could also utilise farm count to visualise the horizontal scaling of food production and whether it matches the increased food output. If the horizontal scaling is present, yet no vertical growth in outputs per farm, that can also be employed as a key indicator.", "After I had gathered all the data, mostly from Singapore Department of Statistics, I went to clean the datasets by removing errorneous data and formatting it the way I needed it (mostly within Microsoft Excel and Power Query Editor). I then started crafting the visualisations, separating it into 3 pages - food imports, local food production, local food farms.", "I had to work with the data to create calculated metrics such as average output per farm on the vertical scaling front and year over year growth on food imports.", "Last part was decorating the visualisations, which was a fun aspect as I worked in Inkscape to create icons and other visual elements."],
			["Challenges", "Singapore has no prevelent issue of food insecurity amongst its population. This led to data scarcity on direct food security metrics."],
			["How I Overcame Those Challenges", "Indirect indicators were used as a proxy mean to measure food security. Such as share of food consumption in Singapore that is imported.", "Food security means ensuring availability of sufficient and nutritious food at all times. This meant that local food production also played a key role."],
			["Work in progress", "I am still documenting this project, please check again later!", "Alternatively, I am readily contactable at hi@chenghock.com :)"]
		],
		"accentColor": "#019c80"
	}
}

export const ProjectDataOrder: Array<Array<string>> = [
	["qriller", "brainbloomai"],
	["study"]
]