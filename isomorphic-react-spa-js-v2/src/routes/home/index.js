import * as React from 'react';
// import {connect} from 'react-redux';

class Home extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render() {
        return (
            <div>
                Home
                <a href="#">Click</a>
            </div>
        );
    }

}

export default Home;
