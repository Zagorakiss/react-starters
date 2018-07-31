import {connect} from 'react-redux';
import {MapOfProjects} from 'components';
// import {login, loginWithTfa} from '../../../redux/actions/session';

const mapStateToProps = state => {
  const {isAuth, email, token, isFetching} = state.session;
  const {filteredData} = state.filter;
  const {env} = state;
  return {
    isAuth,
    email,
    token,
    isFetching,
    env,
    filteredData
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

export const MapOfProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOfProjects);
