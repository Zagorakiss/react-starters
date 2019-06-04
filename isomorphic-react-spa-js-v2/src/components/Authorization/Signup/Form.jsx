import * as React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {FormTemplate} from '../Templates/FormTemplate'
import {Description} from '../Templates/Description'
import {Fieldset} from '../Templates/Fieldset'
import ReCAPTCHA from 'react-google-recaptcha'
import {translate} from 'react-i18next';
import {NotificationContainer} from 'react-notifications';
import {createNotification} from 'utils';

class Form extends React.PureComponent {

  // recaptcha: ReCAPTCHA

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      passwordFirst: '',
      passwordSecond: '',
      verified: false,
      captchaData: '',
      privacyState: true
    }
  }

  reCaptchaSuccess = (value) => {
    this.setState({
      verified: true,
      captchaData: value
    })
  }

  takeInput = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

  getPrivacy = (state) => {
    this.setState({
      privacyState: state
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.privacyState) {
      if (this.state.verified) {
        if (this.state.passwordFirst === this.state.passwordSecond) {
          const userData = {
            email: this.state.email,
            password: this.state.passwordFirst,
            'g-recaptcha-response': this.state.captchaData
          }
          this.props.signup(userData)
          this.recaptcha.reset()
        } else {
          console.warn('dontMatch');
          createNotification('warning', this.props.t('registration.form.dontMatch'), 'Warning')
        }
      } else {
        console.warn('capchaValidation');
        createNotification('error', this.props.t('registration.form.capchaValidation'), 'Error')
      }
    } else {
      console.warn('licenseValidation');
      createNotification('error', this.props.t('registration.form.licenseValidation'), 'Error')
    }
  }

  render () {
    const {t} = this.props

    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          className={`login__form`}
        >
          <div className="login__field-group">
            <div
              className={`login__field-container login__field-container_email`}>
              <input
                name="email"
                type="email"
                onChange={this.takeInput}
                label="Email"
                placeholder="example@mail.com"
                required
                className="login__field"
              />
            </div>
            <Description>
              {t('registration.form.email')}
            </Description>
          </div>
          <div className="login__field-group">
            <div
              className={`login__field-container login__field-container_password`}>
              <input
                name="passwordFirst"
                type="password"
                onChange={this.takeInput}
                required
                label={t('registration.form.passwordLabelFirst')}
                pattern="[a-zA-Z0-9].{9,}"
                placeholder={t('registration.form.passwordLabelFirst')}
                className="login__field"
              />
            </div>
            <Description>
              {t('registration.form.password')}
            </Description>
            <div
              className={`login__field-container login__field-container_passwordSecond`}>
              <input
                name="passwordSecond"
                type="password"
                onChange={this.takeInput}
                required
                placeholder={t('registration.form.passwordLabelSecond')}
                label={t('registration.form.passwordLabelSecond')}
                pattern="[a-zA-Z0-9].{9,}"
                className="login__field"
              />
            </div>
          </div>
          <ReCaptchaContainer>
            <ReCAPTCHA
              ref={e => this.recaptcha = e}
              sitekey="6LdNgUMUAAAAABg_yhKQaW7bJOTfeJsjOI1j_E01"
              onChange={this.reCaptchaSuccess}
              theme="dark"
              size="normal"
              // size="invisible"
              // badge="inline"
            />
          </ReCaptchaContainer>
          <div className="login__btn-group">
            <button
              type="submit"
              disabled={this.props.isFetching}
              className="button login__btn login__btn_auto"
            >
              {t('registration.form.openAccount')}
            </button>
          </div>
        </form>
        <NotificationContainer />
      </div>
    )
  }
}

Form.propTypes = {
  signup: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('authorization')(Form);

const Agreement = styled.div`
display: flex;
align-items: center;
margin-bottom: 40px;
`

const ReCaptchaContainer = styled.div`
// margin: 40px 0;
margin: 60px 0 0 0;
display: flex;
justify-content: center;
align-items: center;
`

const CheckboxContainer = styled.div`
// margin-right: 10px;
`

const Text = styled.span`
// color: var(--grey-purple);
`
