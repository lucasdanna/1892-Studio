import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section style={styles.section}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.content}
      >
        <h1 style={styles.title}>
          1892<br/>STUDIO
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={styles.subtitle}
        >
          NO HACEMOS RUIDO. CREAMOS IMPACTO DIGITAL.
        </motion.p>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={styles.scrollDown}
      >
        ↓ DESCUBRIR
      </motion.div>
    </section>
  )
}

const styles = {
  section: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '2rem',
    textAlign: 'center',
    borderBottom: '2px solid var(--text-color)'
  },
  content: {
    zIndex: 2,
  },
  title: {
    fontSize: 'clamp(5rem, 15vw, 15rem)',
    lineHeight: '0.85',
    margin: 0,
    textShadow: '10px 10px 0px color-mix(in srgb, var(--text-color) 40%, var(--bg-color))',
    wordBreak: 'break-word',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 2rem)',
    marginTop: '2rem',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
  },
  scrollDown: {
    position: 'absolute',
    bottom: '2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em'
  }
}
