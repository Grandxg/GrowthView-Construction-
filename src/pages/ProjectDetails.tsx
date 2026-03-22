import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, Share2, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { toast } from "sonner"

export function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data)
        document.title = `${data.title} | Apex Build`
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Button asChild variant="outline" className="text-slate-900">
          <Link to="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    )
  }

  const images = JSON.parse(project.imageUrls)

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={images[0]} 
          alt={project.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute top-8 left-8 z-10">
          <Button asChild variant="outline" size="icon" className="rounded-full bg-slate-900/50 border-white/10 text-white hover:bg-slate-800">
            <Link to="/portfolio"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <span className="text-orange-500 text-sm font-bold tracking-wider uppercase mb-4 block">{project.category}</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{project.title}</h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-3xl leading-relaxed">{project.description}</p>
            </div>
            <Button onClick={handleShare} variant="outline" className="shrink-0 bg-transparent border-white/20 text-white hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" /> Share Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Completion Date</p>
                <p className="text-white font-medium">{new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <User className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Client</p>
                <p className="text-white font-medium">{project.clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Tag className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Category</p>
                <p className="text-white font-medium">{project.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.map((img: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden aspect-video"
                >
                  <img src={img} alt={`${project.title} - Image ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
