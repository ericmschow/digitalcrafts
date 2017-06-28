import React from 'react'

class ContactList extends React.Component {
  constructor(props) {
    super();
    this.contacts = props.contacts;
    console.log(this.contacts[0])
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
