import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        window.location.href = '/admin'
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <div style={styles.container}>
      <motion.form 
        style={styles.form} 
        className="brutalist-border brutalist-shadow"
        onSubmit={handleLogin}
      >
        <h2 style={styles.title}>ADMIN LOGIN</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input 
          style={styles.input} 
          className="brutalist-border" 
          placeholder="Usuario" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          style={styles.input} 
          className="brutalist-border" 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <motion.button 
          style={styles.button}
          className="brutalist-border brutalist-shadow"
          whileHover={{ scale: 1.05 }}
        >
          INGRESAR
        </motion.button>
      </motion.form>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--bg-color)'
  },
  form: {
    backgroundColor: 'var(--bg-color)',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem'
  },
  input: {
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '1rem'
  },
  button: {
    padding: '1rem',
    backgroundColor: 'var(--text-color)',
    color: 'var(--bg-color)',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.2rem',
    marginTop: '1rem'
  }
}
