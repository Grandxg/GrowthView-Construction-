import { HardHat } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-4">
            <HardHat className="w-8 h-8 text-orange-500" />
            <span className="font-montserrat font-bold text-xl tracking-wider uppercase">Apex Build</span>
          </div>
          <p className="text-sm max-w-md">
            Premium construction and building services for high-end residential, commercial, and industrial projects. Building the future with precision and excellence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>info@buildviral.in</li>
            <li>+918888701750</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-sm text-center">
        &copy; {new Date().getFullYear()} GrowthView. All rights reserved.
      </div>
    </footer>
  )
}
