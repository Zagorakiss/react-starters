import {connect} from 'react-redux';
import {Header} from 'components';

const mapStateToProps = state => {
  const {isAuth, email, token, isFetching} = state.session;
  const {env} = state;
  return {
    isAuth,
    email,
    token,
    isFetching,
    env
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
