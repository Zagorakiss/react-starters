// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Template } from '../Templates'
import { Confirm } from './Confirm'
import { CustomLink } from '../../CustomLink'
import { Form } from './Form'
import { translate } from 'react-i18next'

type Props = {
  isAuth: boolean,
  signup: Function,
  userId: string,
  email: string,
  changeEmail: Function,
  emailRepeat: Function,
  openSuccessMessage: Function,
  openErrorMessage: Function,
  isFetching: boolean,
  t: Function
}

@translate('authorization')
export class Signup extends Component<Props> {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    changeEmail: PropTypes.func.isRequired,
    emailRepeat: PropTypes.func.isRequired,
    openSuccessMessage: PropTypes.func.isRequired,
    openErrorMessage: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render () {
    const { t } = this.props
    if (this.props.isAuth) {
      return (
        <Redirect to='/' />
      )
    }
    if (this.props.userId) {
      return (
        <Confirm 
          email={this.props.email} 
          userId={this.props.userId}
          emailRepeat={this.props.emailRepeat}
          changeEmail={this.props.changeEmail}
          openSuccessMessage={this.props.openSuccessMessage}
          openErrorMessage={this.props.openErrorMessage}
          t={t}
        />
      )
    }
    return (
      <Template heading={t('registration.heading')}>
        <Form 
          signup={this.props.signup} 
          openErrorMessage={this.props.openErrorMessage}
          isFetching={this.props.isFetching}
          t={t} />
          <LoginText>
            {t('registration.loginText')} <CustomLink to='/login'>
              {t('registration.loginButton')}
            </CustomLink>
          </LoginText>
      </Template>      
    )
  }
}

const LoginText = styled.p`
font-size: 16px;
color: var(--grey-purple);
@media (min-width: 600px) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 60px;
}
`
