import {connect} from 'react-redux';
import {Login} from 'components';
import {login, loginWithTfa} from '../../../redux/actions/session';
// import {openPopup} from '../../../redux/actions/popup';
// import {openError} from '../../../redux/actions/systemMessages';

const mapStateToProps = state => {
  const {isAuth, email, tfaNeeded, tfaType, token, isFetching} = state.session;
  return {
    isAuth,
    email,
    tfaNeeded,
    tfaType,
    token,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: userData => {
      return dispatch(login(userData))
    },
    loginWithTfa: data => {
      return dispatch(loginWithTfa(data))
    }
    // openPopup: node => {
    //   return dispatch(openPopup(node))
    // },
    // openError: data => {
    //   return dispatch(openError(data))
    // }
  }
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
