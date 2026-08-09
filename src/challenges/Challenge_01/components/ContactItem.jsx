function ContactItem({ contacto, onDelete }) {
  return (
    <li className="contact-item">
      <div>
        <strong>{contacto.nombre}</strong>
        <span> — {contacto.telefono}</span>
      </div>
      <button onClick={() => onDelete(contacto.id)}>Eliminar</button>
    </li>
  )
}

export default ContactItem
