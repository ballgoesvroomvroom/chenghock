import { SocialsContainer } from "@/app/components/socials"

export function Footer() {
  return (
    <footer className="bg-white border-solid border-black border-t-2 p-3 pb-10 gap-3 flex flex-col md:flex-row justify-between">
      <div className="grow">
        <div className="w-8/12">
          <p className="font-bold text-2xl">CHONG CHENG HOCK</p>
          <p>Pursuing a Diploma in Applied AI & Analytics @ Nanyang Polytechnic</p>
        </div>
      </div>
      <div className="grow">
        <p className="font-bold text-xl pb-2">Pages</p>
        <nav className="flex flex-row gap-2">
          <a href="/about" className="hocus:font-bold">About</a>
          <a href="/works" className="hocus:font-bold">Works</a>
          <a href="/contact" className="hocus:font-bold">Contact</a>
        </nav>
      </div>
      <div className="grow">
        <p className="font-bold text-xl pb-2">Socials</p>
        <SocialsContainer iconSize={32} />
      </div>
    </footer>
  )
}