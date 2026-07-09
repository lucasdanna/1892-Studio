import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function About() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/config`)
      .then(res => res.json())
      .then(data => {
        if (data && data.about) setAbout(data.about)
      })
      .catch(console.error)
  }, [])

  if (!about || (!about.text && !about.imageBase64)) return null;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {about.imageBase64 && (
          <motion.div 
            style={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="brutalist-border brutalist-shadow"
          >
            <img src={about.imageBase64} alt="Conóceme" style={styles.image} />
          </motion.div>
        )}
        <div style={styles.textWrapper}>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={styles.heading}
          >
            CONÓCEME
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={styles.text}
          >
            {about.text}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '8rem 2rem',
    borderBottom: '2px solid var(--text-color)',
    backgroundColor: 'var(--bg-color)'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '4rem',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapper: {
    flex: '1 1 300px',
    maxWidth: '500px',
    backgroundColor: 'var(--text-color)',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    border: '4px solid var(--bg-color)'
  },
  textWrapper: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 'clamp(3rem, 6vw, 6rem)',
    marginBottom: '2rem',
    borderBottom: '10px solid var(--text-color)',
    display: 'inline-block'
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  }
}
