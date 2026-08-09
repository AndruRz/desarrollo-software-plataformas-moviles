import { Component } from 'react'

export default class ChallengeErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Error mostrando el desafío:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="cv__fallback">
          Este desafío todavía no tiene una vista para mostrar (o falló al
          cargar). Revisa el componente en su carpeta dentro de{' '}
          <code className="mono">src/challenges/</code>.
        </div>
      )
    }
    return this.props.children
  }
}
