import React from 'react'
import { motion } from 'framer-motion'

export default function ComingSoon() {
  return (
    <section style={styles.section}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={styles.spinner}
      >
        ✦
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={styles.heading}
      >
        ALGO GRANDE SE APROXIMA
      </motion.h2>
      <p style={styles.sub}>MANTENTE ATENTO A PRÓXIMAS NOVEDADES</p>
    </section>
  )
}

const styles = {
  section: {
    padding: '10rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottom: '2px solid var(--text-color)',
    backgroundColor: 'var(--bg-color)'
  },
  spinner: {
    fontSize: '5rem',
    marginBottom: '2rem'
  },
  heading: {
    fontSize: 'clamp(2rem, 6vw, 6rem)',
    margin: 0
  },
  sub: {
    fontSize: '1.5rem',
    marginTop: '1rem',
    letterSpacing: '0.2em'
  }
}
