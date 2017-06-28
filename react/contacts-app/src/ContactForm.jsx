import React from 'react';
import {Card, CardText, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './ContactForm.css'
class ContactForm extends React.Component {
  constructor(props) {
    super();
    this.callback = props.callback
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
            console.log('submitted')
            console.log('state is :', this.state)
            this.callback(this.state)
            }
          }>
        <Card id='contactCard' initiallyExpanded={true}>
          <CardHeader
            title="Add New Contact"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText id='CardText' expandable={true}>
            <TextField
              name="name"
              defaultValue={this.state.name}
              floatingLabelText="Name"
              hintText="John Smith"
              onChange={event => this.update_state(event, 'name')}
            /><br />
            <TextField
              name="email"
              type='email'
              floatingLabelText="Email"
              hintText="name@example.com"
              onChange={event => this.update_state(event, 'email')}
            /><br />
            <TextField
              name="phone"
              floatingLabelText="Phone Number"
              hintText="(555)555-5555"
              onChange={event => this.update_state(event, 'phone')}
            /><br />
            <TextField
              name="address"
              floatingLabelText="Address"
              hintText="123 Happy Blvd"
              onChange={event => this.update_state(event, 'address')}
            /><br />
            <TextField
              name='city'
              floatingLabelText="City"
              hintText="Houston"
              onChange={event => this.update_state(event, 'city')}
            /><br />
            <TextField
              name='state'
              floatingLabelText="State"
              hintText="TX"
              onChange={event => this.update_state(event, 'state')}
            /><br />
            <TextField
              name='zip'
              floatingLabelText="Zip Code"
              hintText="77090"
              onChange={event => this.update_state(event, 'zip')}
            /><br />
          </CardText>
          <CardActions expandable={true}>
            <RaisedButton type="Submit" label="Submit Contact" primary={true} />
          </CardActions>
        </Card>
      </form>
      </div>
    )
  }
}

export default ContactForm
