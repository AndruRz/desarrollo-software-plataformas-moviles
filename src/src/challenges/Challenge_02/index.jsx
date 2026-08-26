import { useState, useEffect } from 'react'
import Loader from '../Challenge_01/components/Loader'
import ContactForm from '../Challenge_01/components/ContactForm'
import ContactList from '../Challenge_01/components/ContactList'
import heroImg from '../../assets/hero.png'
import '../Challenge_01/style.css'
import './style.css'

// Challenge 02: mismo comportamiento del Challenge 01,
// convertido en PWA con estrategia hibrida de cache.

function Challenge02() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'André Rodriguez', telefono: '300 123 4567' },
        { id: 2, nombre: 'Pablo Pérez', telefono: '311 987 6543' },
        { id: 3, nombre: 'Lina Ospina', telefono: '320 456 7890' },
      ])
      setCargando(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto])
  }

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id))
  }

  if (cargando) {
    return <Loader />
  }

  return (
    <div className="challenge02">
      <img
        src={heroImg}
        alt="Ilustracion del portafolio"
        className="challenge02__hero"
      />
      <h2>Mis contactos (PWA)</h2>
      <ContactForm onAddContact={agregarContacto} />
      <ContactList contactos={contactos} onDelete={eliminarContacto} />
    </div>
  )
}

export default Challenge02
