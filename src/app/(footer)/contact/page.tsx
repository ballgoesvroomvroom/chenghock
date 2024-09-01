import { SocialsContainer } from "@/app/components/socials";

import quotation_icon from "@/public/icons/quotes.svg"

export default function ContactPage() {
	return (
		<div className="flex flex-col p-4 md:p-8 md:pt-24">
			<div className="flex justify-between gap-48">
				<div className="grow">
					<h1 className="font-bold text-4xl pb-4">Reach out</h1>
					<p className="pb-2">I am all ears when it comes to receiving constructive feedback and potential collaboration opportunities.</p>
					<p className="pb-6 md:pb-12">I keep all my socials open for direct messaging, please feel free to reach out to me on whichever channel is your preference.</p>
					<SocialsContainer iconSize={48} />
				</div>
				<div className="hidden md:flex flex-col gap-2 items-start opacity-40 hover:opacity-100 transition-opacity">
					<img src={quotation_icon.src} style={{transform: "scaleX(-1)"}} />
					<p className="font-bold text-4xl">A single leaf working alone provides no shade.</p>
					<div className="flex gap-4 self-end">
						<p className="font-bold text-lg">~ Chuck Page</p>
						<img src={quotation_icon.src} />
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-4 mt-12 md:mt-24">
				<button className="p-3 flex flex-col gap-3 border-solid border-black border-2">
					<p className="font-bold text-lg">LinkedIn</p>
					<p>Chong Cheng Hock</p>
				</button>
				<button className="p-3 flex flex-col gap-3 border-solid border-black border-2">
					<p className="font-bold text-lg">GitHub</p>
					<p>Ballgoesvroomvroom</p>
				</button>
				<button className="p-3 flex flex-col gap-3 border-solid border-black border-2">
					<p className="font-bold text-lg">Telegram</p>
					<p>cheng_hock</p>
				</button>
			</div>
		</div>
	)
}