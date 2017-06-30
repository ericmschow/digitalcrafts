import React from 'react'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import './ContactList.css'
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.contacts = props.contacts;
    this.callback = props.callback;
    console.log(this.contacts);
  }
  deleteContact(key) {
    let contacts = this.contacts;
    delete contacts[key];
    console.log('contacts in delete is ', contacts)
    localStorage.contacts = JSON.stringify(contacts);
    this.callback();
  }
  render() {
    let contacts = []
    if (Object.keys(this.contacts).length === 0){
      return(
        <Card>
          <CardTitle titleStyle={{textAlign: "center"}} title="You don't have any contacts!"></CardTitle>
          <CardText style={{textAlign: "center"}}>Click "Add New" to get started!</CardText>
        </Card>
      )
    }
    else {
      for(var key in this.contacts) {
        let p = this.contacts[key]
        contacts.push(
          <div key={p.email}>
            <Card className='contact' >
              <CardTitle title={p.name}>
                <RaisedButton className='delete' onTouchTap={() => {this.deleteContact(p.email)}} backgroundColor='#aa0000' labelColor="#fff" label="DELETE"/>
              </CardTitle>
              <CardText>
                <ul>
                  <li>Email: {p.email}</li>
                  <li>Phone Number: {p.phone}</li>
                  <li>Address: {p.address}, {p.city}, {p.state} {p.zip}</li>
                </ul>
              </CardText>
            </Card>
          </div>
        )
      }
      return(
        <ul>
          {contacts}
        </ul>
      )
    }
  }
}
export default ContactList
