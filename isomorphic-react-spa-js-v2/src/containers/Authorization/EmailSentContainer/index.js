import { connect } from 'react-redux'
import { EmailSent } from '../../../components/Authorization/EmailSent'
import { openError, openSuccess } from '../../../redux/actions/systemMessages'

const mapDispatchToProps = (dispatch) => {
  return {
    openErrorMessage: text => {
      return dispatch(openError(text))
    },
    openSuccessMessage: text => {
      return dispatch(openSuccess(text))
    }
  }
}

export const EmailSentContainer = connect(
  null,
  mapDispatchToProps
)(EmailSent)
