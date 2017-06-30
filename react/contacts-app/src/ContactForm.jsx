import React from 'react';
import {Card, CardText, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './ContactForm.css'
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.callback = props.callback;
    this.contacts = props.contacts;
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    };
  };

  update_state(event, key) {
    this.setState({[key]: event.target.value})
  }
  render() {
    return (
      <div>
        <form onSubmit={(event) => {
            event.preventDefault()
            let contact = this.state
            // console.log('contact is ',contact)
            // let contacts = this.contacts;
            // contacts[contact.email] = contact;
            // console.log(contacts);
            // localStorage.contacts = JSON.stringify(contacts);
            this.setState({
              name: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              zip: '',
            })
            this.callback(contact);
            }
          }>
        <Card id='contactCard'>
          <CardTitle
            title="Add New Contact"
          />
          <CardText id='CardText'>
            <TextField
              name="name"
              value={this.state.name}
              floatingLabelText="Name"
              hintText="John Smith"
              onChange={event => this.update_state(event, 'name')}
            /><br />
            <TextField
              name="email"
              type='email'
              value={this.state.email}
              floatingLabelText="Email"
              hintText="name@example.com"
              onChange={event => this.update_state(event, 'email')}
            /><br />
            <TextField
              name="phone"
              value={this.state.phone}
              floatingLabelText="Phone Number"
              hintText="(555)555-5555"
              onChange={event => this.update_state(event, 'phone')}
            /><br />
            <TextField
              name="address"
              value={this.state.address}
              floatingLabelText="Address"
              hintText="123 Happy Blvd"
              onChange={event => this.update_state(event, 'address')}
            /><br />
            <TextField
              name='city'
              value={this.state.city}
              floatingLabelText="City"
              hintText="Houston"
              onChange={event => this.update_state(event, 'city')}
            /><br />
            <TextField
              name='state'
              value={this.state.state}
              floatingLabelText="State"
              hintText="TX"
              onChange={event => this.update_state(event, 'state')}
            /><br />
            <TextField
              name='zip'
              value={this.state.zip}
              floatingLabelText="Zip Code"
              hintText="77090"
              onChange={event => this.update_state(event, 'zip')}
            /><br />
          </CardText>
          <CardActions>
            <RaisedButton type="Submit" label="Submit Contact" primary={true} />
          </CardActions>
        </Card>
      </form>
      </div>
    )
  }
}

export default ContactForm
