import * as React from 'react';
// import {connect} from 'react-redux';
import {ProfileContainer} from '../../containers/ProfileContainer';

class ProfileRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <ProfileContainer />
        );
    }

}

export default ProfileRoute;
