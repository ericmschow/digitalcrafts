import React from 'react';
import {Card, CardText, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.contacts = props.contacts;
    this.callback = props.callback;
  }
  deleteContact(id){
    console.log(id)
    delete contacts[id];
    localStorage.contacts = JSON.stringify(contacts);
    this.callback();
  }
  render() {
    deleteContact(id)
  }
}

export default Delete
