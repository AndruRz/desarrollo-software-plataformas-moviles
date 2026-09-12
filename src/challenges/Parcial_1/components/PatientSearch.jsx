// El estado de la búsqueda vive en el componente padre (PacientesApp).
// Este componente solo recibe el valor actual y notifica los cambios.
function PatientSearch({ busqueda, onBusquedaChange }) {
  return (
    <div className="patient-search">
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o CC..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />
    </div>
  )
}

export default PatientSearch
