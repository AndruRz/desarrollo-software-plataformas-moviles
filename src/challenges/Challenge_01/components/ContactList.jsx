import ContactItem from './ContactItem'

function ContactList({ contactos, onDelete }) {
  if (contactos.length === 0) {
    return <p className="contact-list__empty">Todavía no hay contactos.</p>
  }

  return (
    <ul className="contact-list">
      {contactos.map((contacto) => (
        <ContactItem key={contacto.id} contacto={contacto} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default ContactList
