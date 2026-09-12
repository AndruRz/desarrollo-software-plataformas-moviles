function PatientItem({ paciente }) {
  return (
    <li className="patient-item">
      <div>
        <strong>{paciente.nombre} {paciente.apellido}</strong>
        <span> — CC: {paciente.cc}</span>
      </div>
      <span>{paciente.telefono}</span>
    </li>
  )
}

export default PatientItem
