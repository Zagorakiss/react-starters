import { connect } from 'react-redux'
import { Signup } from '../../../components/Authorization/Signup'
import { signup, emailRepeat, changeEmail } from '../../../redux/actions/session'
import { openSuccess, openError } from '../../../redux/actions/systemMessages'

const mapStateToProps = state => {
  const { isAuth, userId, email, isEmailRepeated, isFetching } = state.session
  return {
    isAuth,
    userId,
    isEmailRepeated,
    email,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: userData => {
      return dispatch(signup(userData))
    },
    emailRepeat: userId => {
      return dispatch(emailRepeat(userId))
    },
    changeEmail: userData => {
      return dispatch(changeEmail(userData))
    },
    openSuccessMessage: text => {
      return dispatch(openSuccess(text))
    },
    openErrorMessage: text => {
      return dispatch(openError(text))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    emailRepeat: () => {
      const id = {
        user_id: stateProps.userId
      }
      return dispatchProps.emailRepeat(id)
    },

    changeEmail: (newEmail) => {
      const userData = {
        user_id: stateProps.userId,
        new: newEmail
      }
      return dispatchProps.changeEmail(userData)
    }
  })
}

export const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Signup)
