import * as React from 'react';
// import {connect} from 'react-redux';
import {FilterContainer} from '../../containers/Home/FilterContainer';
import {MapOfProjectsContainer} from '../../containers/Home/MapOfProjectsContainer';

class HomeRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    // static fetchData(dispatch) {
    //     return getProjects(dispatch);
    // }

    render() {
        return (
            <div>
                <FilterContainer />
                <MapOfProjectsContainer />
            </div>
        );
    }

}

export default HomeRoute;
