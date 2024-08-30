import logo_linkedin from "@/public/ext_logos/media/linkedin.svg"
import logo_github from "@/public/ext_logos/media/github.svg"
import logo_telegram from "@/public/ext_logos/media/telegram.svg"
import logo_email from "@/public/ext_logos/media/email.svg"

export function SocialsContainer({ iconSize }: { iconSize?: number }) {
	if (iconSize == null) {
		// not defined, default of 64px
		iconSize = 64
	}

	return (
		<div className="flex flex-row gap-4">
			<a href="https://www.linkedin.com/in/chong-cheng-hock-232b75282" className="p-px" target="_blank"><img src={logo_linkedin.src} alt="LinkedIn" style={{width: `${iconSize}px`, height: `${iconSize}px`}} /></a>
			<a href="https://github.com/ballgoesvroomvroom" className="p-px" target="_blank"><img src={logo_github.src} alt="GitHub" style={{width: `${iconSize}px`, height: `${iconSize}px`}} /></a>
			<a href="https://t.me/cheng_hock" className="p-px" target="_blank"><img src={logo_telegram.src} alt="Telegram" style={{width: `${iconSize}px`, height: `${iconSize}px`}} /></a>
			<a href="mailto:hi@chenghock.com" className="p-px" target="_blank"><img src={logo_email.src} alt="Email" style={{width: `${iconSize}px`, height: `${iconSize}px`}} /></a>
		</div>
	)
}