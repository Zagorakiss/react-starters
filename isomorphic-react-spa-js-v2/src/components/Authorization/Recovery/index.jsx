// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EmailSentContainer } from '../../../containers/Authorization/EmailSentContainer'
import { Input } from '../../FormComponents/Input'
import { Button } from '../../Buttons'
import { Template } from '../Templates'
import { FormTemplate } from '../Templates/FormTemplate'
import { RecoveryIcon } from '../../Svg/RecoveryIcon'
import { translate } from 'react-i18next'

type Props = {
  isAuth: boolean,
  recovery: Function,
  isFetching: boolean,
  t: Function
}

type State = {
  isSent: boolean,
  email: string
}

@translate('authorization')
export class Recovery extends Component<Props, State> {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    recovery: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  constructor () {
    super()
    this.state = {
      isSent: false,
      email: ''
    }
  }

  submitHandler = (event: SyntheticEvent<FormTemplate>) => {
    event.preventDefault()
    this.props.recovery(this.state.email)
      .then(() => this.setState({isSent: true}))
  }

  takeInput = (field: { name: string, value: string }) => {
    this.setState({[field.name]: field.value})
  }

  render () {
    const { t } = this.props
    if (this.state.isSent) {
      return (
        <EmailSentContainer
          text={t('recovery.emailSent')}
          email={this.state.email}
          emailRepeat={() => this.props.recovery(this.state.email)}
        />
      )
    } else {
      return (
        <Template
          heading={t('recovery.heading')}
          icon={<RecoveryIcon />}
        >
          <Text>
            {t('recovery.text')}
          </Text>
          <FormTemplate onSubmit={this.submitHandler}>
            <InputContainer>
              <Input
                name='email'
                type='email'
                label='Email'
                takeValue={this.takeInput}
                required
              />
            </InputContainer>
            <Button 
              type='submit'
              disabled={this.props.isFetching}>
              {t('recovery.submit')}
            </Button>
          </FormTemplate>
        </Template>
      )
    }
  }
}

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