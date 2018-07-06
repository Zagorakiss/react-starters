import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Template } from '../Templates'
// import { CustomLink } from '../../CustomLink'
// import { LoginForm } from './LoginForm'
// import { LockIcon } from '../../Svg/LockIcon'
// import { TwoFactorInputContainer } from '../../../containers/TwoFactorInputContainer'
import { translate } from 'react-i18next'

@translate('authorization')
export class Login extends React.PureComponent {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    openPopup: PropTypes.func.isRequired,
    tfaNeeded: PropTypes.bool.isRequired,
    tfaType: PropTypes.string.isRequired,
    loginWithTfa: PropTypes.func.isRequired,
    token: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tfaNeeded) {
      this.props.openPopup(
        <TwoFactorInputContainer
          action={this.loginWithTfa}
          type={nextProps.tfaType} />
      )
    }
  }

  // loginWithTfa = (code) => {
  //   const data = {
  //     otp: code,
  //     token: this.props.token.access_token
  //   }
  //   return this.props.loginWithTfa(data)
  //     .then(() => { return Promise.resolve() })
  //     .catch(error => { return Promise.reject(error) })
  // }

  render () {
    const { t, login, email, openPopup, isFetching, openError } = this.props
    return (
      // <Template
      //   heading={t('login.heading')}
      //   icon={<LockIcon />}
      // >
      //   <FormContainer>
      //     <LoginForm
      //       login={login} 
      //       email={email}
      //       openPopup={openPopup}
      //       isFetching={isFetching}
      //       t={t}
      //       openError={openError} />
      //   </FormContainer>
      //   <CustomLink to='/recovery'>{t('login.recovery')}</CustomLink>
      // </Template>
      <div>
        {t('login.page')}
      </div>
    )
  }
}

const FormContainer = styled.div`
  margin-bottom: 25px;
  width: 100%;
`
