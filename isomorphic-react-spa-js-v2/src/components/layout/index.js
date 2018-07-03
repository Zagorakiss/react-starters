import * as React from 'react';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {setDeviceDetails} from 'actions';

const mapDispatchToProps = (dispatch) => {
    return {
        setDeviceDetails: () => setDeviceDetails(dispatch)
    };
};

// const commonRoutes = []
// const protectedRoutes = []
// const guestRoutes = []

class Layout extends React.PureComponent {

    componentWillMount() {
        this.props.setDeviceDetails();
    }

    render() {
        const {route} = this.props;
        const isAuth = true;
        const filteredRoutes = route.routes.filter( (item) => {
            if (item.type === 'common' ) {
                return true;
            }
            if (item.type === 'guest' && !isAuth) {
                return true
            }
            if (item.type === 'protected' && isAuth) {
                if (!item.subType) {
                  return true
              } else if (item.subType === 'premium') {
                  return true
              }
            }
        } );
        return (
            <div id="layout">
                <div id="routes">
                    {/* {renderRoutes(route && route.routes)} */}
                    {renderRoutes(filteredRoutes)}
                    {/* {commonRoutes}
                    {isAuth ? protectedRoutes : guestRoutes} */}
                </div>
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(Layout);
