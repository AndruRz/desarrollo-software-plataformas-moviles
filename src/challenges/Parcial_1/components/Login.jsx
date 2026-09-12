import { useState } from 'react'

// Usuario fijo, definido por el desarrollador (requisito del enunciado)
const USUARIO_VALIDO = { usuario: 'admin', clave: 'admin123' }

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const manejarSubmit = (e) => {
    e.preventDefault()

    if (usuario === USUARIO_VALIDO.usuario && clave === USUARIO_VALIDO.clave) {
      setError('')
      onLogin(usuario)
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="parcial1-login">
      <h2>MediClinic — Iniciar sesión</h2>
      <form className="parcial1-login__form" onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>

      {error && <p className="parcial1-login__error">{error}</p>}

      <p className="parcial1-login__hint mono">admin / admin123</p>
    </div>
  )
}

export default Login
