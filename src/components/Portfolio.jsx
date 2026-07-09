import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Portfolio() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error)
  }, [])

  return (
    <section style={styles.section}>
      <motion.h2 
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        style={styles.heading}
      >
        TRABAJOS DESTACADOS
      </motion.h2>

      <div style={styles.list}>
        {projects.length === 0 && <p style={{textAlign: 'right'}}>NO HAY PROYECTOS AÚN.</p>}
        {projects.map((proj, idx) => {
          const formattedLink = proj.link && !proj.link.startsWith('http') ? `https://${proj.link}` : proj.link;
          return (
            <motion.div 
              key={proj._id || idx}
              style={styles.item}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', paddingLeft: '2rem' }}
              onClick={() => formattedLink ? window.open(formattedLink, '_blank') : null}
            >
              <div style={styles.itemContent}>
                <h3 style={styles.projectName}>{proj.name}</h3>
                <p style={styles.projectType}>{proj.type} / {proj.year}</p>
              </div>
              <ArrowUpRight size={48} />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '8rem 2rem',
    borderBottom: '2px solid var(--text-color)'
  },
  heading: {
    fontSize: 'clamp(3rem, 8vw, 8rem)',
    marginBottom: '4rem',
    textAlign: 'right',
    textDecoration: 'underline'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 1rem',
    borderTop: '2px solid var(--text-color)',
    borderBottom: '2px solid var(--text-color)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  projectName: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    margin: 0
  },
  projectType: {
    fontSize: '1.5rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    opacity: 0.9
  }
}
