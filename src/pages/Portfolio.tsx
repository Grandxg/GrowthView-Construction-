import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    document.title = "Portfolio | Apex Build"
    
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-32">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            OUR <span className="text-orange-500">PORTFOLIO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Explore our diverse range of completed projects, showcasing our commitment to quality, innovation, and excellence in construction.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-slate-900 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const images = JSON.parse(project.imageUrls)
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] block cursor-pointer"
                  >
                    <Link to={`/projects/${project.id}`}>
                      <img 
                        src={images[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-orange-500 text-xs font-bold tracking-wider uppercase mb-2 block">{project.category}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex items-center text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          View Details <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
