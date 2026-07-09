import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('bw')
  const [themeColors, setThemeColors] = useState({ bgColor: '#0B2416', textColor: '#FFD700' })

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/config`)
      .then(res => res.json())
      .then(data => {
        if (data && data.theme) setThemeColors(data.theme)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (theme === 'gold') {
      document.body.classList.add('theme-gold')
      document.documentElement.style.setProperty('--gold-bg', themeColors.bgColor)
      document.documentElement.style.setProperty('--gold-text', themeColors.textColor)
    } else {
      document.body.classList.remove('theme-gold')
    }
  }, [theme, themeColors])

  const toggleTheme = () => {
    setTheme(prev => prev === 'bw' ? 'gold' : 'bw')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={styles.button}
      className="brutalist-border brutalist-shadow"
      title="Cambiar paleta de colores"
    >
      <Palette size={24} />
    </motion.button>
  )
}

const styles = {
  button: {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    zIndex: 9999,
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
  }
}
