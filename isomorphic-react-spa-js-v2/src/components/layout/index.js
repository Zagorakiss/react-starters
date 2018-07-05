import * as React from 'react';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {setDeviceDetails} from '../../redux/actions/env';
import {login, logout} from '../../redux/actions/session';
// import * as _ from 'lodash';

const mapStateToProps = state => {
    return {
        isAuth: state.session.isAuth,
        token: state.session.token
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        setDeviceDetails: () => setDeviceDetails(dispatch),
        logout: () => {
            return dispatch(logout())
        },
        login: (token) => {
            return dispatch(login(token))
        },
    };
};

// const commonRoutes = []
// const protectedRoutes = []
// const guestRoutes = []

class Layout extends React.PureComponent {
    // static propTypes = {
    //     isAuth: PropTypes.bool.isRequired,
    //     logout: PropTypes.func.isRequired,
    //     login: PropTypes.func.isRequired,
    //     token: PropTypes.object.isRequired
    // }

    constructor() {
        super();
        this.state = {
            // infoReceived: false
        }
    }

    componentWillMount() {
        this.props.setDeviceDetails();
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            this.props.login({ refresh_token: token.refresh_token })
                .then(() => console.log('login after refresh'))
                .catch(error => {
                    if (error.text) {
                        this.props.logout()
                            // .then(() => this.setState({ loginOnMount: false }))
                    }
                })
        }
    }

    // componentWillReceiveProps (nextProps) {
    //     if ((nextProps.isAuth === true) && (nextProps.isAuth !== this.props.isAuth )) {
    //         this.props.getProfile()
    //             .then(() => {
    //                 const langInProfile = this.props.profileData.language.toLowerCase()
    //                 if (langInProfile !== i18next.language) {
    //                     i18next.changeLanguage(langInProfile)
    //                 }
    //             })
    //         // this.getInfo()
    //     }
    // }

    render() {
        const {route} = this.props;
        const {isAuth} = this.props;
        // const isAuth = _.get(this.props, `isAuth`);
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
