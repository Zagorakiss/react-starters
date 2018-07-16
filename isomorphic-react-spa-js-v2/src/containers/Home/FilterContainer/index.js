import {connect} from 'react-redux';
import {Filter} from 'components';
// import {login, loginWithTfa} from '../../../redux/actions/session';

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

export const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
