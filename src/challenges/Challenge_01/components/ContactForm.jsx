import { useState } from 'react'

function ContactForm({ onAddContact }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (nombre.trim() === '' || telefono.trim() === '') {
      return
    }

    onAddContact({
      id: Date.now(),
      nombre,
      telefono,
    })

    setNombre('')
    setTelefono('')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button type="submit">Agregar contacto</button>
    </form>
  )
}

export default ContactForm
