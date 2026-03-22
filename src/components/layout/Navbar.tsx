import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { HardHat } from "lucide-react"

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <HardHat className="w-8 h-8 text-orange-500" />
          <span className="font-montserrat font-bold text-xl tracking-wider uppercase">Apex Build</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
          <Link to="/portfolio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Portfolio</Link>
          <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-orange-500 text-white hover:bg-orange-600 h-10 px-6">
          Start Project
        </a>
      </div>
    </motion.header>
  )
}
