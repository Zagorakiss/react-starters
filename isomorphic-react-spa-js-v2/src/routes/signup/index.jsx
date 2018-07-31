import * as React from 'react';
// import {connect} from 'react-redux';
import {SignupContainer} from '../../containers/Authorization/SignupContainer';

class SignupRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <SignupContainer />
        );
    }

}

export default SignupRoute;
