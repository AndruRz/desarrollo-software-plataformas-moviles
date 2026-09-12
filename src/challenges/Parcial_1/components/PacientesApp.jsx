import { useState, useEffect, useMemo } from 'react'
import PatientForm from './PatientForm'
import PatientSearch from './PatientSearch'
import PatientList from './PatientList'

const PACIENTES_KEY = 'parcial1_pacientes'

function cargarPacientes() {
  const guardado = localStorage.getItem(PACIENTES_KEY)
  return guardado ? JSON.parse(guardado) : []
}

// Componente padre: guarda tanto los pacientes como el término de
// búsqueda. La lista filtrada se calcula acá y se envía como prop
// de solo lectura al componente hijo que la muestra (PatientList).
function PacientesApp() {
  const [pacientes, setPacientes] = useState(cargarPacientes)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    localStorage.setItem(PACIENTES_KEY, JSON.stringify(pacientes))
  }, [pacientes])

  const agregarPaciente = (nuevoPaciente) => {
    setPacientes((prev) => [...prev, nuevoPaciente])
  }

  const pacientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    if (!termino) return pacientes

    return pacientes.filter(
      (p) =>
        p.nombre.toLowerCase().includes(termino) ||
        p.apellido.toLowerCase().includes(termino) ||
        p.cc.toLowerCase().includes(termino)
    )
  }, [pacientes, busqueda])

  return (
    <div className="pacientes-app">
      <PatientForm onAddPatient={agregarPaciente} />
      <PatientSearch busqueda={busqueda} onBusquedaChange={setBusqueda} />
      <PatientList pacientes={pacientesFiltrados} />
    </div>
  )
}

export default PacientesApp
