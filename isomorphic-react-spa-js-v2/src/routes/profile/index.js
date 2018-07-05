import * as React from 'react';
// import {connect} from 'react-redux';

class Profile extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
            </div>
        );
    }

}

// export default connect(null, (dispatch) => {
//     return {
//         increment: (count) => increment(dispatch, count)
//     };
// })(Profile);
export default Profile;
