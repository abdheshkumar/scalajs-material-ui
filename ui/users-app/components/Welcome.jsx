import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from '@material-ui/core/TextField';

class Welcome extends React.Component {
  updateField = (fun) => event => {
    const value = event.target.value;
    this.props.updateField(fun(value))
  };

  render() {
    return <div>
      <h1>Hello, {this.props.name}</h1>
      <div>First name:
      <span>
        <TextField
          value ={this.props.profile.firstName}
          onChange={this.updateField(this.props.profile.withFirstName)}
        />
      </span>
      </div>
      <div>Last name:
        <span>
        <TextField
          value ={this.props.profile.lastName}
          onChange={this.updateField(this.props.profile.withLastName)}
        />
      </span>
      </div>

    </div>
  }
}

export default withStyles({name: 'Welcome'})(Welcome);