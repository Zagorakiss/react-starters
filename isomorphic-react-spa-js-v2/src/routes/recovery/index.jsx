import * as React from 'react';
// import {connect} from 'react-redux';
import {RecoveryContainer} from '../../containers/Authorization/RecoveryContainer';

class RecoveryRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <RecoveryContainer />
        );
    }

}

export default RecoveryRoute;
