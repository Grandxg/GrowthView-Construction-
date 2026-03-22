/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { RootLayout } from "./components/layout/RootLayout"
import { Home } from "./pages/Home"
import { Portfolio } from "./pages/Portfolio"
import { ProjectDetails } from "./pages/ProjectDetails"

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" theme="dark" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}
