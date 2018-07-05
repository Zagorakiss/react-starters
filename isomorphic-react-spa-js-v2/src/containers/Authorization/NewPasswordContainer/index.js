import { connect } from 'react-redux'
import { newPassword } from '../../../redux/actions/session'
import { NewPassword } from '../../../components/Authorization/NewPassword/index'
import { openError } from '../../../redux/actions/systemMessages'

const mapStateToProps = state => {
  return {
    isFetching: state.session.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newPassword: data => {
      return dispatch(newPassword(data))
    },
    openErrorMessage: text => {
      return dispatch(openError(text))
    }
  }
}

export const NewPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPassword)
