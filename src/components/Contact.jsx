import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AtSign, MessageCircle, Briefcase, Mail } from 'lucide-react'

export default function Contact() {
  const [socials, setSocials] = useState({ instagram: '#', twitter: '#', linkedin: '#' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/config`)
      .then(res => res.json())
      .then(data => {
        if (data && data.socials) setSocials(data.socials)
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('ENVIANDO...')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setStatus('ENVIADO CORRECTAMENTE')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('ERROR AL ENVIAR')
      }
    } catch (err) {
      setStatus('ERROR DE CONEXIÓN')
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.formSection}>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={styles.heading}
          >
            HABLEMOS.
          </motion.h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input 
              type="text" placeholder="NOMBRE" style={styles.input} className="brutalist-border" required
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" placeholder="CORREO" style={styles.input} className="brutalist-border" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="MENSAJE" style={{...styles.input, height: '150px', resize: 'none'}} className="brutalist-border" required
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
            />
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'var(--text-color)', color: 'var(--bg-color)' }}
              style={styles.button}
              className="brutalist-border brutalist-shadow"
            >
              {status || 'ENVIAR MENSAJE'}
            </motion.button>
          </form>
        </div>
        
        <div style={styles.socialSection}>
          <h3 style={styles.socialHeading}>REDES SOCIALES</h3>
          <div style={styles.socialLinks}>
            <SocialLink href={socials.instagram} icon={<MessageCircle size={40} />} name="INSTAGRAM" />
            <SocialLink href={socials.linkedin} icon={<Briefcase size={40} />} name="LINKEDIN" />
            <SocialLink href="#contact" icon={<Mail size={40} />} name="CONTÁCTANOS" />
          </div>
        </div>
      </div>
    </section>
  )
}

const SocialLink = ({ icon, name, href }) => {
  let formattedHref = href;
  if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto')) {
    const cleanUser = href.replace('@', '');
    if (name === 'INSTAGRAM' && !href.includes('instagram.com')) {
      formattedHref = `https://instagram.com/${cleanUser}`;
    } else if (name === 'TWITTER' && !href.includes('twitter.com') && !href.includes('x.com')) {
      formattedHref = `https://twitter.com/${cleanUser}`;
    } else if (name === 'LINKEDIN' && !href.includes('linkedin.com')) {
      formattedHref = `https://linkedin.com/in/${cleanUser}`;
    } else {
      formattedHref = `https://${href}`;
    }
  }
  return (
    <motion.a 
      href={formattedHref}
      target={formattedHref.startsWith('http') ? "_blank" : "_self"}
      rel="noopener noreferrer"
      style={styles.socialLink}
      whileHover={{ x: 20 }}
    >
      {icon} <span>{name}</span>
    </motion.a>
  )
}

const styles = {
  section: {
    padding: '8rem 2rem',
    borderBottom: '2px solid var(--text-color)'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '4rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    fontSize: 'clamp(3rem, 6vw, 6rem)',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  input: {
    padding: '1.5rem',
    fontSize: '1.2rem',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    fontFamily: 'inherit',
    outline: 'none',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  button: {
    padding: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundColor: 'var(--text-color)',
    color: 'var(--bg-color)',
    cursor: 'pointer',
    marginTop: '1rem',
    fontFamily: 'inherit'
  },
  socialSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  socialHeading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textDecoration: 'underline'
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}
