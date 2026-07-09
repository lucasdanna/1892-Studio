import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Admin() {
  const [config, setConfig] = useState(null)
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [newProject, setNewProject] = useState({ name: '', type: '', year: '', link: '' })
  const [editingProjectId, setEditingProjectId] = useState(null)
  
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    const headers = { 'Authorization': `Bearer ${token}` }
    
    try {
      const [cfgRes, projRes, msgRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/config`, { headers }),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`, { headers }),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages`, { headers })
      ])

      if (!cfgRes.ok || !projRes.ok || !msgRes.ok) {
        throw new Error('Invalid Token or Server Error')
      }

      setConfig(await cfgRes.json())
      setProjects(await projRes.json())
      setMessages(await msgRes.json())
    } catch (e) {
      console.error(e)
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }

  const handleConfigSave = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/config`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(config)
      })
      if (res.ok) {
        alert('Configuración Guardada')
      } else {
        alert('Error al guardar. La imagen podría ser muy pesada.')
      }
    } catch (err) {
      alert('Error de red al guardar.')
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    const url = editingProjectId ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${editingProjectId}` : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`
    const method = editingProjectId ? 'PUT' : 'POST'
    
    // Ensure link has http:// if provided
    let formattedLink = newProject.link;
    if (formattedLink && !formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
      formattedLink = `https://${formattedLink}`;
    }

    await fetch(url, {
      method,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({...newProject, link: formattedLink})
    })
    
    setNewProject({ name: '', type: '', year: '', link: '' })
    setEditingProjectId(null)
    fetchData()
  }

  const handleEditClick = (proj) => {
    setNewProject({ name: proj.name, type: proj.type, year: proj.year, link: proj.link || '' })
    setEditingProjectId(proj._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({...config, about: {...config.about, imageBase64: reader.result}});
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteProject = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchData()
  }

  const handleDeleteMessage = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchData()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (!config) return <div style={styles.container}>Cargando...</div>

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>PANEL DE ADMINISTRADOR</h1>
        <div>
          <a href="/" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Ver Sitio</a>
          <button onClick={handleLogout} style={styles.logoutBtn} className="brutalist-border">SALIR</button>
        </div>
      </header>

      <div style={styles.grid}>
        {/* CONFIG SECTION */}
        <section style={styles.card} className="brutalist-border brutalist-shadow">
          <h2 style={styles.cardHeader}>CONFIGURACIÓN GLOBAL</h2>
          <form onSubmit={handleConfigSave} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Destino (Mensajes)</label>
              <input 
                style={styles.input} className="brutalist-border"
                value={config.emailDestination}
                onChange={e => setConfig({...config, emailDestination: e.target.value})}
              />
            </div>
            
            <h3 style={styles.sectionTitle}>REDES SOCIALES</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Instagram URL</label>
              <input 
                style={styles.input} className="brutalist-border"
                value={config.socials.instagram}
                onChange={e => setConfig({...config, socials: {...config.socials, instagram: e.target.value}})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>LinkedIn URL</label>
              <input 
                style={styles.input} className="brutalist-border"
                value={config.socials.linkedin}
                onChange={e => setConfig({...config, socials: {...config.socials, linkedin: e.target.value}})}
              />
            </div>
            
            <h3 style={styles.sectionTitle}>CONÓCEME</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Texto Sobre Ti</label>
              <textarea 
                style={{...styles.input, height: '120px'}} className="brutalist-border"
                value={config.about?.text || ''}
                onChange={e => setConfig({...config, about: {...config.about, text: e.target.value}})}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Foto (Seleccionar Archivo)</label>
              <input 
                type="file" accept="image/*"
                style={styles.input} className="brutalist-border"
                onChange={handleImageUpload}
              />
              {config.about?.imageBase64 && (
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem', marginTop: '1rem'}}>
                  <img src={config.about.imageBase64} alt="Preview" style={{height: '150px', width: '150px', objectFit: 'cover', border: '4px solid var(--text-color)'}} />
                  <button 
                    type="button" 
                    style={{...styles.deleteBtn, padding: '0.8rem 1.5rem', backgroundColor: '#ff3333'}} 
                    className="brutalist-border brutalist-shadow"
                    onClick={() => setConfig({...config, about: {...config.about, imageBase64: ''}})}
                  >
                    ELIMINAR FOTO
                  </button>
                </div>
              )}
            </div>
            
            <h3 style={styles.sectionTitle}>TEMA SECUNDARIO (COLORES)</h3>
            <div style={{display: 'flex', gap: '1rem'}}>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Color de Fondo</label>
                <input 
                  type="color" 
                  style={styles.colorPicker} 
                  value={config.theme?.bgColor || '#0B2416'}
                  onChange={e => {
                    const newColor = e.target.value;
                    setConfig({...config, theme: {...config.theme, bgColor: newColor}});
                    document.documentElement.style.setProperty('--gold-bg', newColor);
                  }}
                />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Color de Texto</label>
                <input 
                  type="color" 
                  style={styles.colorPicker} 
                  value={config.theme?.textColor || '#FFD700'}
                  onChange={e => {
                    const newColor = e.target.value;
                    setConfig({...config, theme: {...config.theme, textColor: newColor}});
                    document.documentElement.style.setProperty('--gold-text', newColor);
                  }}
                />
              </div>
            </div>
            
            <button style={styles.saveBtn} className="brutalist-border brutalist-shadow">GUARDAR CONFIGURACIÓN</button>
          </form>
        </section>

        {/* PROJECTS SECTION */}
        <section style={styles.card} className="brutalist-border brutalist-shadow">
          <h2 style={styles.cardHeader}>PORTAFOLIO</h2>
          <form onSubmit={handleAddProject} style={{...styles.form, marginBottom: '3rem'}}>
            <div style={styles.inputGroup}>
              <input 
                style={styles.input} className="brutalist-border" placeholder="Nombre (ej. PROYECTO ALPHA)" required
                value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})}
              />
            </div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <div style={{...styles.inputGroup, flex: 2}}>
                <input 
                  style={styles.input} className="brutalist-border" placeholder="Tipo (ej. WEB)" required
                  value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})}
                />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <input 
                  style={styles.input} className="brutalist-border" placeholder="Año" required
                  value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <input 
                style={styles.input} className="brutalist-border" placeholder="Link (ej. www.tuproyecto.com)"
                value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})}
              />
            </div>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <button style={{...styles.saveBtn, flex: 1, marginTop: 0}} className="brutalist-border brutalist-shadow">
                {editingProjectId ? 'GUARDAR CAMBIOS' : 'AGREGAR PROYECTO'}
              </button>
              {editingProjectId && (
                <button 
                  type="button" 
                  style={{...styles.saveBtn, flex: 1, marginTop: 0, backgroundColor: 'var(--bg-color)', color: 'var(--text-color)'}} 
                  className="brutalist-border brutalist-shadow"
                  onClick={() => { setNewProject({ name: '', type: '', year: '', link: '' }); setEditingProjectId(null); }}
                >
                  CANCELAR
                </button>
              )}
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(p => (
              <div key={p._id} style={styles.projectItem} className="brutalist-border brutalist-shadow">
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{p.name}</span>
                  <span style={{opacity: 0.8}}>{p.type} / {p.year}</span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.linkText}>
                      Ver Proyecto ↗
                    </a>
                  )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <button onClick={() => handleEditClick(p)} style={{...styles.deleteBtn, backgroundColor: 'var(--text-color)', color: 'var(--bg-color)'}} className="brutalist-border">EDITAR</button>
                  <button onClick={() => handleDeleteProject(p._id)} style={{...styles.deleteBtn, backgroundColor: '#ff3333'}} className="brutalist-border">X</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MESSAGES SECTION */}
        <section style={styles.card} className="brutalist-border brutalist-shadow">
          <h2 style={styles.cardHeader}>MENSAJES RECIBIDOS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.length === 0 ? <p style={{opacity: 0.7}}>No hay mensajes nuevos.</p> : null}
            {messages.map(m => (
              <div key={m._id} style={styles.msgItem} className="brutalist-border brutalist-shadow">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid var(--text-color)', paddingBottom: '0.5rem'}}>
                  <strong style={{fontSize: '1.2rem'}}>{m.name}</strong>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{opacity: 0.8, fontSize: '0.9rem'}}>{new Date(m.createdAt).toLocaleDateString()}</span>
                    <button 
                      onClick={() => handleDeleteMessage(m._id)}
                      style={{...styles.deleteBtn, backgroundColor: '#ff3333'}} 
                      className="brutalist-border"
                    >
                      X
                    </button>
                  </div>
                </div>
                <a href={`mailto:${m.email}`} style={{...styles.linkText, marginBottom: '1rem', display: 'block'}}>{m.email}</a>
                <p style={{ margin: '0', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{m.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-color)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid var(--text-color)',
    paddingBottom: '1rem'
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: 'red',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem'
  },
  card: {
    padding: '2rem',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    fontSize: '2rem',
    marginBottom: '2rem',
    borderBottom: '4px solid var(--text-color)',
    paddingBottom: '1rem',
    display: 'inline-block'
  },
  sectionTitle: {
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    opacity: 0.9
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '0.05em'
  },
  input: {
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '1rem'
  },
  colorPicker: {
    height: '50px',
    width: '100%',
    cursor: 'pointer',
    padding: '0.2rem',
    backgroundColor: 'var(--bg-color)',
    border: '2px solid var(--text-color)'
  },
  saveBtn: {
    padding: '1rem 2rem',
    backgroundColor: 'var(--text-color)',
    color: 'var(--bg-color)',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: 'var(--bg-color)'
  },
  deleteBtn: {
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  msgItem: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-color)'
  },
  linkText: {
    color: 'var(--text-color)',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  }
}
