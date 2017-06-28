import React, { Component } from 'react';
import './App.css';
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';

class App extends Component {
  constructor(props) {
    super();
    var frank = {
      name: 'Frank',
      email: 'frank@email.com',
      phone: '(281)-555-1934',
      address: '536 Main St',
      city: 'Spring',
      state: 'TX',
      zip: '77836',
    };
    this.state = {contacts : []}
    this.setState(this.state.contacts[frank.email] = frank)

    // this.state.push(frank)
  }
  // adds to contacts list from form
  updateState (contact) {
    console.log(contact)
    // this.state.push(contact)
    let name = contact.name;
    this.setState(this.state.contacts[name] = contact)
    console.log('contacts is ',this.state.contacts)
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <AppBar title='Contacts' />
          </div>
          <p className="App-intro">
            Please enter your contacts to save them!
          </p>
          <div id="FormContainer">
            <ContactForm callback={(contact) => this.updateState(contact)}/>
          </div>
          <div id="ListContainer">
            <ContactList contacts={this.state.contacts}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
