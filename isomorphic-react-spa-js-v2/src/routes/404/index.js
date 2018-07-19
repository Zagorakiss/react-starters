import * as React from 'react';
// import {connect} from 'react-redux';

class Page404 extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    componentWillMount() {
        this.props.history.push('/');
    }

    render() {
        return null;
    }

}

export default Page404;
