import { useState } from 'react'

const SOLO_LETRAS = /^[A-Za-zÀ-ÿ\s]+$/
const SOLO_NUMEROS = /^[0-9]+$/

function PatientForm({ onAddPatient }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [cc, setCc] = useState('')
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState('')

  const manejarSubmit = (e) => {
    e.preventDefault()

    if (!nombre.trim() || !apellido.trim() || !cc.trim() || !telefono.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }
    if (!SOLO_LETRAS.test(nombre.trim())) {
      setError('El nombre solo puede contener letras.')
      return
    }
    if (!SOLO_LETRAS.test(apellido.trim())) {
      setError('El apellido solo puede contener letras.')
      return
    }
    if (!SOLO_NUMEROS.test(cc.trim())) {
      setError('La CC solo puede contener números.')
      return
    }

    onAddPatient({
      id: Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      cc: cc.trim(),
      telefono: telefono.trim(),
    })

    setNombre('')
    setApellido('')
    setCc('')
    setTelefono('')
    setError('')
  }

  return (
    <form className="patient-form" onSubmit={manejarSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        placeholder="CC"
        value={cc}
        onChange={(e) => setCc(e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button type="submit">Agregar paciente</button>

      {error && <p className="patient-form__error">{error}</p>}
    </form>
  )
}

export default PatientForm
