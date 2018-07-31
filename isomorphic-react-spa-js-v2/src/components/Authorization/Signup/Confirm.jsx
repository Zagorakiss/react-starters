import * as React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {EmailSentContainer} from '../../../containers/Authorization/EmailSentContainer'
import {translate} from 'react-i18next';
import {NotificationContainer} from 'react-notifications';
import {createNotification} from 'utils';

class Confirm extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      isEmailChanging: false,
      newEmail: ''
    }
  }

  onChangeEmail = () => {
    this.setState(prevState => ({
      isEmailChanging: !prevState.isEmailChanging
    }))
  }

  takeInput = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

  sendNewEmail = (event) => {
    event.preventDefault()
    this.props.changeEmail(this.state.newEmail)
      .then(() => this.onChangeEmail())
      .then(() => createNotification('success', this.props.t('registration.confirm.mailChangedMessage'), 'Success'))
  }

  render () {
    const {t} = this.props
    let email =
      <Text secondary>
        {t('registration.confirm.didWrong')}
          <button
            type="button"
            onClick={this.onChangeEmail}
            className="login__btn login__btn_text"
          >
            {t('registration.confirm.change')}
          </button>
      </Text>

    if (this.state.isEmailChanging) {
      email =
        <form
          onSubmit={this.sendNewEmail}
          className={`login__form`}
        >
          <InputContainer>
            <input
              name="newEmail"
              type="email"
              onChange={this.takeInput}
              label="Email"
              className="login__field"
            />
          </InputContainer>
          <div className="login__btn-group">
            <button
              type="submit"
              disabled={this.props.isFetching}
              className="button login__btn login__btn_auto"
            >
              {t('registration.confirm.send')}
            </button>
          </div>
        </form>
    }

    return (
        <EmailSentContainer
          text={t('registration.confirm.emailSent')}
          email={this.props.email}
          emailRepeat={this.props.emailRepeat}
        >
          {email}
          <NotificationContainer />
        </EmailSentContainer>
    )
  }
}

Confirm.propTypes = {
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  emailRepeat: PropTypes.func.isRequired,  
  changeEmail: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('authorization')(Confirm);

const Text = styled.p`
margin: 0;
margin-bottom: 65px;
text-align: center;
line-height: 1.4;
font-size: 16px;
width: 100%;
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`

const InputContainer = styled.div`
flex-grow: 1;
margin-bottom: 40px;
width: 100%;
`
