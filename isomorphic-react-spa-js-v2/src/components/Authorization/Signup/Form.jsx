// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from '../../FormComponents/Input'
import { Button } from '../../Buttons'
import { FormTemplate } from '../Templates/FormTemplate'
import { Description } from '../Templates/Description'
import { Fieldset } from '../Templates/Fieldset'
import { Checkbox } from '../../FormComponents/Checkbox'
import { CustomLink } from '../../CustomLink'
import ReCAPTCHA from 'react-google-recaptcha'
import MediaQuery from 'react-responsive'

type Props = {
  signup: Function,
  openErrorMessage: Function,
  isFetching: boolean,
  t: Function
}

type State = {
  email: string,
  passwordFirst: string,
  passwordSecond: string,
  verified: boolean,
  captchaData: string,
  privacyState: boolean
}

export class Form extends Component<Props, State> {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    openErrorMessage: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  recaptcha: ReCAPTCHA

  constructor () {
    super()
    this.state = {
      email: '',
      passwordFirst: '',
      passwordSecond: '',
      verified: false,
      captchaData: '',
      privacyState: false
    }
  }

  reCaptchaSuccess = (value: string) => {
    this.setState({
      verified: true,
      captchaData: value
    })
  }

  takeInput = (field: { name: string, value: string }) => {
    this.setState({[field.name]: field.value})
  }

  getPrivacy = (state: boolean) => {
    this.setState({
      privacyState: state
    })
  }
  
  onSubmit = (event: SyntheticEvent<FormTemplate>) => {
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
          this.props.openErrorMessage(this.props.t('registration.form.dontMatch'))
        }
      } else {
        this.props.openErrorMessage(this.props.t('registration.form.capchaValidation'))
      }
    } else {
      this.props.openErrorMessage(this.props.t('registration.form.licenseValidation'))
    }
  }

  render () {
    const { t } = this.props

    return (
      <FormTemplate onSubmit={this.onSubmit}>
        <Fieldset>
          <Input
            name='email'
            type='email'
            takeValue={this.takeInput}
            label='Email'
            placeholder='example@mail.com'
            required
          />
          <Description>
            {t('registration.form.email')}
          </Description>
        </Fieldset>
        <Fieldset>
          <Input
            name='passwordFirst'
            type='password'
            takeValue={this.takeInput}
            required
            label={t('registration.form.passwordLabelFirst')}
            pattern='[a-zA-Z0-9].{9,}'
          />
          <Description>
            {t('registration.form.password')}
          </Description>
        </Fieldset>
        <Input
            name='passwordSecond'
            type='password'
            takeValue={this.takeInput}
            required
            label={t('registration.form.passwordLabelSecond')}
            pattern='[a-zA-Z0-9].{9,}'
          />
        <ReCaptchaContainer>
          <MediaQuery minWidth={400}>
            {matches => {
              if (matches) {
                return (
                  <ReCAPTCHA
                    ref={e => this.recaptcha = e}
                    sitekey='6LdAyTcUAAAAAPDU18WIj3sOzmBZceHgXdYjS7lW'
                    onChange={this.reCaptchaSuccess} />
                )
              } else {
                return (
                  <ReCAPTCHA
                    ref={e => this.recaptcha = e}
                    sitekey='6LdAyTcUAAAAAPDU18WIj3sOzmBZceHgXdYjS7lW'
                    onChange={this.reCaptchaSuccess}
                    size='compact' />
                )
              }
            }}
          </MediaQuery>
        </ReCaptchaContainer>
        <Agreement>
          <CheckboxContainer>
            <Checkbox getState={this.getPrivacy} />
          </CheckboxContainer>
          <Text>
            <span>{t('registration.form.policyAccept')}</span>
            <CustomLink to='/license/policy'>
              {t('registration.form.policy')}
            </CustomLink>
            <span>{t('registration.form.and')}</span>
            <CustomLink to='/license/agreement'>
              {t('registration.form.agreement')}
            </CustomLink>
          </Text>
        </Agreement>
        <Button
          type='submit'
          disabled={this.props.isFetching}>
          {t('registration.form.openAccount')}
        </Button>
      </FormTemplate>
    )
  }
}

const Agreement = styled.div`
display: flex;
align-items: center;
margin-bottom: 41px;
`

const ReCaptchaContainer = styled.div`
margin: 40px 0;
`

const CheckboxContainer = styled.div`
margin-right: 10px;
`

const Text = styled.span`
color: var(--grey-purple);
`
