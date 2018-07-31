import * as React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import styled from 'styled-components';
import {Template} from '../Templates'
import Confirm from './Confirm';
import Form from './Form';
import {translate} from 'react-i18next';

class Signup extends React.PureComponent {

  render () {
    const {t} = this.props
    if (this.props.isAuth) {
      return (
        <Redirect to="/" />
      )
    }
    if (this.props.userId) {
      return (
        <div className="login-container">
          <div className="login login_confirm">
            <div className="login__title">{t('emailSent.heading')}</div>
            <Confirm
              email={this.props.email}
              userId={this.props.userId}
              emailRepeat={this.props.emailRepeat}
              changeEmail={this.props.changeEmail}
              openSuccessMessage={this.props.openSuccessMessage}
              openErrorMessage={this.props.openErrorMessage}
              t={t}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="login-container">
        <div className="login login_signup">
          <div className="login__title">Sign up</div>
            <Form
              signup={this.props.signup}
              openErrorMessage={this.props.openErrorMessage}
              isFetching={this.props.isFetching}
              t={t}
            />
            <LoginText>
              {t('registration.loginText')} <Link to="/login" className="login__link">
                {t('registration.loginButton')}
              </Link>
            </LoginText>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  changeEmail: PropTypes.func.isRequired,
  emailRepeat: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default translate('authorization')(Signup);

const LoginText = styled.p`
font-size: 16px;
// color: var(--grey-purple);
@media (min-width: 600px) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 60px;
}
`
