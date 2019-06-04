import {connect} from 'react-redux';
import {Profile} from 'components';
import {logout} from '../../redux/actions/session';

const mapStateToProps = state => {
  const {isAuth, token, isFetching} = state.session;
  const {email, favorites} = state.profile.list;
  const registrationDate = state.profile.list.registration_date;
  const isProfileFetching = state.profile.isFetching;
  const {dataLoaded} = state.profile;
  return {
    isAuth,
    token,
    isFetching,
    email,
    registrationDate,
    favorites,
    isProfileFetching,
    dataLoaded
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
