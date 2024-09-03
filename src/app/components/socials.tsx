import logo_linkedin from "@/public/ext_logos/media/linkedin.svg"
import logo_github from "@/public/ext_logos/media/github.svg"
import logo_telegram from "@/public/ext_logos/media/telegram.svg"
import logo_email from "@/public/ext_logos/media/email.svg"

export const SOCIALS_LINKEDIN = "https://www.linkedin.com/in/chong-cheng-hock-232b75282"
export const SOCIALS_GITHUB = "https://github.com/ballgoesvroomvroom"
export const SOCIALS_TELEGRAM = "https://t.me/cheng_hock"
export const SOCIALS_EMAIL = "mailto:hi@chenghock.com"

export function SocialsContainer({ iconSize }: { iconSize?: number }) {
	if (iconSize == null) {
		// not defined, default of 64px
		iconSize = 64
	}

	return (
		<div className="socials-container flex flex-row gap-4">
			<a href={SOCIALS_LINKEDIN} className="relative p-px" target="_blank">
				<img src={logo_linkedin.src} alt="LinkedIn" style={{width: `${iconSize}px`, height: `${iconSize}px`}} />
				<div className="focus-under absolute -bottom-2 h-1 w-full bg-black-accent"></div>
			</a>
			<a href={SOCIALS_GITHUB} className="relative p-px" target="_blank">
				<img src={logo_github.src} alt="GitHub" style={{width: `${iconSize}px`, height: `${iconSize}px`}} />
				<div className="focus-under absolute -bottom-2 h-1 w-full bg-black-accent"></div>
			</a>
			<a href={SOCIALS_TELEGRAM} className="relative p-px" target="_blank">
				<img src={logo_telegram.src} alt="Telegram" style={{width: `${iconSize}px`, height: `${iconSize}px`}} />
				<div className="focus-under absolute -bottom-2 h-1 w-full bg-black-accent"></div>
			</a>
			<a href={SOCIALS_EMAIL} className="relative p-px" target="_blank">
				<img src={logo_email.src} alt="Email" style={{width: `${iconSize}px`, height: `${iconSize}px`}} />
				<div className="focus-under absolute -bottom-2 h-1 w-full bg-black-accent"></div>
			</a>
		</div>
	)
}