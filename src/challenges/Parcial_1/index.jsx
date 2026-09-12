import { useState, useEffect } from 'react'
import Login from './components/Login'
import PacientesApp from './components/PacientesApp'
import './style.css'

// Parcial 1 — Ejercicio 1: PWA React para MediClinic (login + pacientes + búsqueda)

const SESSION_KEY = 'parcial1_session'

function Parcial1() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Al recargar, recupera la sesión guardada en localStorage
  useEffect(() => {
    const sesionGuardada = localStorage.getItem(SESSION_KEY)
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada).usuario)
    }
    setCargando(false)
  }, [])

  const manejarLogin = (usuarioIngresado) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ usuario: usuarioIngresado }))
    setUsuario(usuarioIngresado)
  }

  const cerrarSesion = () => {
    localStorage.removeItem(SESSION_KEY)
    setUsuario(null)
  }

  if (cargando) return null

  return (
    <div className="parcial1">
      {usuario ? (
        <>
          <div className="parcial1__header">
            <h2>MediClinic — Pacientes</h2>
            <button className="parcial1__logout" onClick={cerrarSesion}>
              Cerrar sesión ({usuario})
            </button>
          </div>
          <PacientesApp />
        </>
      ) : (
        <Login onLogin={manejarLogin} />
      )}
    </div>
  )
}

export default Parcial1
