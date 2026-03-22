import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50 font-inter selection:bg-orange-500/30">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
