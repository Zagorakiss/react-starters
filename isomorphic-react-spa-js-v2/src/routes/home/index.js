import * as React from 'react';
import {connect} from 'react-redux';
import {increment} from 'actions';

class Home extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            foo: 0
        }
    }

    componentDidMount() {
        this.props.increment(1);
        setTimeout(() => {
            this.setState({
                foo: 1
            });
        }, 300);
    }

    render() {
        return (
            <div>
                Hom
                <a href="#">Click</a>
            </div>
        );
    }

}

export default connect(null, (dispatch) => {
    return {
        increment: (count) => increment(dispatch, count)
    };
})(Home);
