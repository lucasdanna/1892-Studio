import React from 'react'
import { motion } from 'framer-motion'
import { Code, Shield, Film, Palette, Users } from 'lucide-react'

const services = [
  { title: "DISEÑO Y DESARROLLO WEB", icon: <Code size={48} />, desc: "Identidades visuales impactantes con React y tecnologías modernas." },
  { title: "EDICIÓN DE VIDEOS", icon: <Film size={48} />, desc: "Contenido audiovisual dinámico y de alto impacto." },
  { title: "DISEÑO DE LOGOS", icon: <Palette size={48} />, desc: "Creamos marcas con identidad única y profesional." },
  { title: "COMMUNITY MANAGEMENT", icon: <Users size={48} />, desc: "Gestión de redes para conectar y dominar tu audiencia." },
  { title: "CIBERSEGURIDAD", icon: <Shield size={48} />, desc: "Protección blindada y seguridad absoluta de datos." }
]

export default function Services() {
  return (
    <section style={styles.section}>
      <motion.h2 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        style={styles.heading}
      >
        NUESTROS SERVICIOS
      </motion.h2>

      <div style={styles.grid}>
        {services.map((srv, idx) => (
          <motion.div 
            key={idx}
            className="brutalist-border brutalist-shadow"
            style={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div style={styles.iconWrapper}>{srv.icon}</div>
            <h3 style={styles.cardTitle}>{srv.title}</h3>
            <p style={styles.cardDesc}>{srv.desc}</p>
          </motion.div>
        ))}
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
    borderBottom: '10px solid var(--text-color)',
    display: 'inline-block'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    padding: '3rem',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'crosshair'
  },
  iconWrapper: {
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'var(--text-color)',
    color: 'var(--bg-color)',
    borderRadius: '50%'
  },
  cardTitle: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  cardDesc: {
    fontSize: '1.2rem',
    opacity: 0.8
  }
}
