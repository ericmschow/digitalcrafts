import React, { Component } from 'react';
import './App.css';
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import FlatButton from 'material-ui/FlatButton';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

const Home = (contacts) => (<div><h2>Your Contacts</h2> <ContactList/></div>)
const NoMatch = ({ location }) => (<div><h3>Page not found: {location.pathname}</h3></div>)
const Article = ({ match }) => <div><h3>Article Slug: {match.params.slug}</h3></div>
const AddButton = <div>Add</div>

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
    let contacts = [];
    localStorage.contacts = JSON.stringify(contacts);
    // DEBUG below this line
    console.log('local contacts is ', localStorage.contacts)
    let newContacts = JSON.parse(localStorage.contacts);
    newContacts.push(frank)
    localStorage.contacts = JSON.stringify(newContacts);
    console.log('local contacts is now ', localStorage.contacts)

    // this.state.push(frank)
  }
  // adds to contacts list from form
  updateState (contact) {
    console.log(contact)
    // this.state.push(contact)
    let name = contact.name;
    var new_contacts = this.state.contacts;
    new_contacts[name] = contact;

    this.setState({contacts: new_contacts});
    console.log('contacts is ',this.state.contacts)
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title='Contacts' />
          <BrowserRouter>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add</Link></li>
                <li><Link to="/article/frank">Article</Link></li>
              </ul>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/add" component={({history}) => (<ContactForm history={history} callback={(contact) => this.updateState(contact)}/>)}/>
                <Redirect from="/old-form" to="/form"/>
                <Route path="/article/:slug" component={Article}/>
                <Route component={NoMatch}/>
              </Switch>
              <div id='ListContainer'>

              </div>
            </div>
          </BrowserRouter>
        </div>
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
