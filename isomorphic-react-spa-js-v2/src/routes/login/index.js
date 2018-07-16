import * as React from 'react';
// import {connect} from 'react-redux';
import {LoginContainer} from '../../containers/Authorization/LoginContainer';

class LoginRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <LoginContainer />
        );
    }

}

export default LoginRoute;
