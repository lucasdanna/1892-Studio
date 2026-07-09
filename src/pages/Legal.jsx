import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Legal() {
  const { type } = useParams();

  const getContent = () => {
    switch (type) {
      case 'privacidad':
        return {
          title: 'POLÍTICA DE PRIVACIDAD',
          text: `En 1892 STUDIO valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web y utilizas nuestros servicios de desarrollo, ciberseguridad, y diseño.
          
1. Información que recopilamos
Podemos recopilar información personal que nos proporcionas directamente, como tu nombre, dirección de correo electrónico y el contenido de los mensajes que envías a través de nuestro formulario de contacto.

2. Uso de la información
Utilizamos la información que recopilamos para:
- Responder a tus consultas y brindarte nuestros servicios.
- Mejorar la seguridad y el funcionamiento de nuestro sitio web.
- Enviar notificaciones relacionadas con tus proyectos.

3. Seguridad de los datos
Implementamos medidas de seguridad técnicas (como encriptación, Helmet, CORS estricto y rate limiting) para proteger tu información contra acceso, alteración o destrucción no autorizados.

4. Compartir información
No vendemos, intercambiamos ni transferimos a terceros tu información personal, excepto cuando sea estrictamente necesario para cumplir con la ley o proteger nuestros derechos.

Si tienes preguntas sobre nuestra política de privacidad, contáctanos a través de nuestro formulario.`
        };
      case 'terminos':
        return {
          title: 'TÉRMINOS Y CONDICIONES',
          text: `Bienvenido a 1892 STUDIO. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones:

1. Servicios
1892 STUDIO ofrece servicios de desarrollo web, ciberseguridad, creación de logos, aplicaciones móviles y community management. Nos reservamos el derecho de modificar o discontinuar cualquier servicio sin previo aviso.

2. Propiedad Intelectual
Todo el contenido, diseño, logotipos, gráficos y código fuente de este sitio web son propiedad exclusiva de 1892 STUDIO o se utilizan con permiso. No puedes reproducir, distribuir ni utilizar nuestro material sin autorización previa por escrito.

3. Limitación de Responsabilidad
Aunque aplicamos las mejores prácticas en ciberseguridad, 1892 STUDIO no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar nuestro sitio web o servicios.

4. Modificaciones
Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.

Para cualquier consulta legal, por favor contáctanos.`
        };
      case 'cumplimiento':
        return {
          title: 'DATOS Y CUMPLIMIENTO (COMPLIANCE)',
          text: `En 1892 STUDIO estamos comprometidos con el cumplimiento de las normativas de protección de datos (como el RGPD y leyes de protección de datos locales).

1. Recopilación Transparente
Solo recopilamos los datos estrictamente necesarios para el funcionamiento de nuestros servicios.

2. Derechos del Usuario
Tienes derecho a acceder, rectificar, limitar o solicitar la eliminación de tus datos personales almacenados en nuestros sistemas en cualquier momento. 

3. Cookies y Rastreo
Nuestro sitio web puede utilizar cookies técnicas esenciales para garantizar el correcto funcionamiento y la seguridad (por ejemplo, tokens JWT para sesiones de administrador). No utilizamos cookies de rastreo invasivas de terceros sin tu consentimiento.

4. Reporte de Brechas
En el improbable caso de una brecha de seguridad, nos comprometemos a notificar a los usuarios afectados y a las autoridades competentes en los plazos establecidos por la ley.

Para ejercer tus derechos sobre tus datos, envíanos un mensaje a través de nuestra sección de contacto.`
        };
      default:
        return {
          title: 'PÁGINA NO ENCONTRADA',
          text: 'El documento legal que buscas no existe.'
        };
    }
  };

  const content = getContent();

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.contentBox}
        className="brutalist-border brutalist-shadow"
      >
        <Link to="/" style={styles.backBtn}>← VOLVER AL INICIO</Link>
        <h1 style={styles.title}>{content.title}</h1>
        <div style={styles.textContainer}>
          {content.text.split('\n').map((paragraph, idx) => (
            <p key={idx} style={styles.paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
  },
  contentBox: {
    backgroundColor: 'var(--bg-color)',
    padding: '4rem',
    maxWidth: '800px',
    width: '100%',
  },
  backBtn: {
    display: 'inline-block',
    marginBottom: '2rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
    letterSpacing: '0.1em'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    marginBottom: '2rem',
    lineHeight: 1,
    letterSpacing: '-0.05em'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    opacity: 0.9,
    whiteSpace: 'pre-wrap'
  }
};
