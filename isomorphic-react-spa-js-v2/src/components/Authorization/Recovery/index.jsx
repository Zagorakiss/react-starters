import * as React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {EmailSentContainer} from '../../../containers/Authorization/EmailSentContainer'
import {Template} from '../Templates'
import {FormTemplate} from '../Templates/FormTemplate'
import {translate} from 'react-i18next'

class Recovery extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      isSent: false,
      email: ''
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.recovery(this.state.email)
      .then(() => this.setState({isSent: true}))
  }

  takeInput = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

  // takeInput = (event) => {
	// 	this.setState({[event.target.name]: event.target.value});
	// }

  render () {
    const {t} = this.props;
    if (this.state.isSent) {
      return (
        <div className="login-container">
          <div className="login login_confirm">
            <EmailSentContainer
              text={t('recovery.emailSent')}
              email={this.state.email}
              emailRepeat={() => this.props.recovery(this.state.email)}
            />
          </div>
        </div>
      )
    }
    return (
        <div className="login-container">
          <div className="login login_recovery">
            <div className="login__title">{t('recovery.heading')}</div>
            <Text>
              {t('recovery.text')}
            </Text>
            <form
              onSubmit={this.submitHandler}
              className={`login__form`}
            >
              <InputContainer>
                <input
                  name="email"
                  type="email"
                  label="Email"
                  onChange={this.takeInput}
                  required
                  className="login__field"
                />
              </InputContainer>
              <div className="login__btn-group">
                <button
                  type="submit"
                  disabled={this.props.isFetching}
                  className="button login__btn login__btn_auto"
                >
                  {t('recovery.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  }
}

Recovery.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  recovery: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default translate('authorization')(Recovery);

const Text = styled.p`
margin: 0;
margin-bottom: 40px;
text-align: center;
font-size: 16px;
color: var(--grey-purple);
`

const InputContainer = styled.div`
width: 100%;
margin-bottom: 35px;
`