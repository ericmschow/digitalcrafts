import React from 'react'

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.contacts = JSON.parse(localStorage.contacts);
    console.log(this.contacts)
  }
  render() {
    const contacts = this.contacts.map((p) =>
      <li key={p.email}>
        {p.name}: {p.email}
      </li>
    )
    return(
      <ul>
        {contacts}
      </ul>
    )
  }
}

export default ContactList
