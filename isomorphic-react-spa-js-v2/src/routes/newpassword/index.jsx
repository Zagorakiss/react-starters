import * as React from 'react';
// import {connect} from 'react-redux';
import {NewPasswordContainer} from '../../containers/Authorization/NewPasswordContainer';

class NewPasswordRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <NewPasswordContainer />
        );
    }

}

export default NewPasswordRoute;
