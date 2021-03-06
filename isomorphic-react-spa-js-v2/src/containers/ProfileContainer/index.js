import {connect} from 'react-redux';
import {Profile} from 'components';
import {logout} from '../../redux/actions/session';

const mapStateToProps = state => {
  const {isAuth, email, token, isFetching} = state.session;
  return {
    isAuth,
    email,
    token,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      return dispatch(logout())
    }
    // login: userData => {
    //   return dispatch(login(userData))
    // },
    // loginWithTfa: data => {
    //   return dispatch(loginWithTfa(data))
    // }
    // openPopup: node => {
    //   return dispatch(openPopup(node))
    // },
    // openError: data => {
    //   return dispatch(openError(data))
    // }
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
