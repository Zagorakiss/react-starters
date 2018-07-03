import * as React from 'react';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {setDeviceDetails} from 'actions';

const mapDispatchToProps = (dispatch) => {
    return {
        setDeviceDetails: () => setDeviceDetails(dispatch)
    };
};

class Layout extends React.PureComponent {

    componentWillMount() {
        this.props.setDeviceDetails();
    }

    render() {
        const {route} = this.props;
        return (
            <div id="layout">
                <div id="routes">
                    {renderRoutes(route && route.routes)}
                </div>
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(Layout);
