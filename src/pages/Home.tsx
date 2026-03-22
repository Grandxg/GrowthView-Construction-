import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, CheckCircle2, Building2, HardHat, Ruler } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export function Home() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    document.title = "Apex Build | Premium Construction & Architecture"
    
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.slice(0, 3)) // Show only top 3 on home
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!res.ok) throw new Error('Failed to submit')
      
      toast.success('Message sent successfully! We will be in touch soon.')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "ConstructionCompany"],
          "name": "Apex Build",
          "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
          "@id": "",
          "url": "https://apexbuild.com",
          "telephone": "+918888701750"
        })}
      </script>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
            alt="Construction Site" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            BUILDING <span className="text-orange-500">EXCELLENCE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light"
          >
            Premium construction and architectural solutions for visionary clients. We turn ambitious blueprints into enduring realities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="accent" className="w-full sm:w-auto text-lg px-8 h-14" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Apex Build</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-orange-500 mx-auto" 
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Building2, title: "Commercial Expertise", desc: "Decades of experience delivering high-rise office buildings and retail complexes on time and under budget." },
              { icon: HardHat, title: "Safety First", desc: "Industry-leading safety protocols ensuring every site is secure for our workers and clients." },
              { icon: Ruler, title: "Precision Engineering", desc: "Meticulous attention to detail and cutting-edge technology applied to every phase of construction." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors shadow-xl shadow-black/20"
              >
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-orange-500" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/portfolio" className="text-orange-500 hover:text-orange-400 font-medium flex items-center mt-4 md:mt-0 transition-colors group">
                View All Projects <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-slate-800 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, i) => {
                const images = JSON.parse(project.imageUrls)
                return (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/5] block cursor-pointer shadow-2xl shadow-black/40"
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
                        <span className="text-orange-500 text-sm font-bold tracking-wider uppercase mb-2 block">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-slate-300 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
          >
            
            <div className="w-full md:w-2/5 bg-slate-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <motion.div 
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.2 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" alt="Blueprint" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold mb-4"
                >
                  Let's Build Together
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-slate-300 mb-8"
                >
                  Ready to start your next visionary project? Contact our team of experts today.
                </motion.p>
                
                <ul className="space-y-6">
                  {[
                    "Award-winning architectural design",
                    "Transparent pricing & timelines",
                    "Dedicated project management"
                  ].map((text, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                      className="flex items-start"
                    >
                      <CheckCircle2 className="w-6 h-6 text-orange-500 mr-3 shrink-0" />
                      <span className="text-slate-300">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-12 bg-slate-900">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input id="name" name="name" required className="bg-slate-950 border-slate-800 text-white focus:ring-orange-500" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                    <Input id="email" name="email" type="email" required className="bg-slate-950 border-slate-800 text-white focus:ring-orange-500" placeholder="john@example.com" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" className="bg-slate-950 border-slate-800 text-white focus:ring-orange-500" placeholder="+918888701750" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-slate-300">Project Type</Label>
                    <select 
                      id="projectType" 
                      name="projectType" 
                      required 
                      className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select a type...</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed-Use">Mixed-Use</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="message" className="text-slate-300">Project Details</Label>
                  <Textarea id="message" name="message" required className="bg-slate-950 border-slate-800 text-white focus:ring-orange-500 min-h-[120px]" placeholder="Tell us about your vision..." />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Submit Inquiry'}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
