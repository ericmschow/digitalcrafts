import React, { Component } from 'react';
import './App.css';
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
// import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  blue900, cyan700, red700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

const theme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    backgroundColor: darkBlack
  }
})

const NoMatch = ({ location }) => (<div><h3>Page not found: {location.pathname}</h3></div>)
const Article = ({ match }) => <div><h3>Article Slug: {match.params.slug}</h3></div>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {dummy: ''};
    var frank = {
      name: 'Frank',
      email: 'frank@email.com',
      phone: '(281)-555-1934',
      address: '536 Main St',
      city: 'Spring',
      state: 'TX',
      zip: '77836',
    };
    // DEBUG below this line
    let contacts = {}
    try {this.state.contacts = JSON.parse(localStorage.contacts)}
    catch (e) {
      console.error(e)
      this.state.contacts = contacts
    }

    // contacts[frank.email] = frank;
    // // console.log('contacts is ', contacts)
    // localStorage.contacts = contacts
    // // console.log('local contacts is ', localStorage.contacts)
    // let newContacts = {};
    // newContacts[frank.email] = frank;
    // // console.log('newContacts is, ', frank)
    // localStorage.contacts = JSON.stringify(newContacts);
    // console.log()
    // console.log('local contacts is now ', localStorage.contacts)
  }
  // adds to contacts list from form
  refresh(){
    console.log('refreshed');
    this.state.contacts = JSON.parse(localStorage.contacts);
    console.log(this.state.contacts);
    this.setState({contacts: this.state.contacts});
  }

  updateState (contact) {
    let contacts = this.state.contacts;
    contacts[contact.email] = contact;
    this.state.contacts = contacts;
    this.setState({contacts: this.state.contacts})
    localStorage.contacts = JSON.stringify(contacts);
    console.log('localStorage.contacts in updateState is: ', JSON.parse(localStorage.contacts))
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <BrowserRouter>
          <div>
          <AppBar title='Contacts' />
          <Tabs>
            <Tab label="VIEW CONTACTS" onActive={() => this.refresh()}>
              <div className='background'>
                <ContactList contacts={this.state.contacts} callback={() => this.refresh()}/>
              </div>
            </Tab>
            <Tab label="ADD NEW">
              <div>
                <ContactForm contacts={this.state.contacts} callback={(contact) => this.updateState(contact)}/>
              </div>
            </Tab>
          </Tabs>

      {
        //          <Route exact path="/" component={Home}/>
        // <Route path="/delete/:id" component={(id) => <delete id={id}/>}/>
}
        </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
function fillBlank(put_in_above){
  // <div className="App">
  //   <div className="App-header">
  //     <AppBar title='Contacts' />
  //   </div>
  //   <p className="App-intro">
  //     Please enter your contacts to save them!
  //   </p>
  //   <div id="FormContainer">
  //     <ContactForm callback={(contact) => this.updateState(contact)}/>
  //   </div>
  //   <div id="ListContainer">
  //     <ContactList contacts={this.state.contacts}/>
  //   </div>
  // </div>
}
export default App;
