import React from 'react'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <h1 style={styles.logo}>1892 STUDIO</h1>
      <div style={styles.bottomRow}>
        <p>© {new Date().getFullYear()} 1892 STUDIO. TODOS LOS DERECHOS RESERVADOS.</p>
        <div style={styles.legalLinks}>
          <a href="/legal/privacidad" style={styles.legalLink}>PRIVACIDAD</a>
          <a href="/legal/terminos" style={styles.legalLink}>TÉRMINOS</a>
          <a href="/legal/cumplimiento" style={styles.legalLink}>COMPLIANCE</a>
          <span style={{opacity: 0.5}}>|</span>
          <a href="/admin" style={styles.adminLink}>ADMIN</a>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  },
  logo: {
    fontSize: 'clamp(2rem, 10vw, 8rem)',
    margin: 0,
    letterSpacing: '-0.05em'
  },
  bottomRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    borderTop: '2px solid var(--text-color)',
    paddingTop: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.9rem',
    letterSpacing: '0.1em'
  },
  adminLink: {
    color: 'var(--text-color)',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  legalLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  legalLink: {
    opacity: 0.8,
    textDecoration: 'underline',
    transition: 'opacity 0.2s',
  }
}
