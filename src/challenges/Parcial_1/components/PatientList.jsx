import PatientItem from './PatientItem'

// Componente hijo "tonto": no guarda estado propio, solo pinta
// la lista filtrada que le llega desde el padre (PacientesApp).
function PatientList({ pacientes }) {
  if (pacientes.length === 0) {
    return <p className="patient-list__empty">No hay pacientes para mostrar.</p>
  }

  return (
    <ul className="patient-list">
      {pacientes.map((paciente) => (
        <PatientItem key={paciente.id} paciente={paciente} />
      ))}
    </ul>
  )
}

export default PatientList
