import React from 'react';
import {withStyles} from 'material-ui/styles';

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

export default withStyles({name: 'Welcome'})(Welcome);