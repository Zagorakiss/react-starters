import { connect } from 'react-redux'
import { Recovery } from '../../../components/Authorization/Recovery'
import { recovery } from '../../../redux/actions/session'

const mapStateToProps = state => {
  const { isAuth, email, isFetching } = state.session
  return {
    isAuth,
    email,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recovery: email => {
      return dispatch(recovery(email))
    }
  }
}

export const RecoveryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Recovery)
