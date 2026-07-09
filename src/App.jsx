import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Legal from './pages/Legal'

function MainLayout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      <ThemeToggle />
      <motion.div
        className="progress-bar"
        style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '5px', background: 'var(--text-color)', transformOrigin: '0%', zIndex: 9999 }}
      />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<><ThemeToggle /><Login /></>} />
          <Route path="/admin" element={<><ThemeToggle /><Admin /></>} />
          <Route path="/legal/:type" element={
            <>
              <ThemeToggle />
              <Legal />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
