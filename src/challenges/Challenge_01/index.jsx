import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './style.css'

// Challenge 01: listar, agregar y eliminar contactos,

function Challenge01() {
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
    <div className="challenge01">
      <h2>Mis contactos</h2>
      <ContactForm onAddContact={agregarContacto} />
      <ContactList contactos={contactos} onDelete={eliminarContacto} />
    </div>
  )
}

export default Challenge01
