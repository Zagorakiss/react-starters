// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from '../../Buttons'
import { ButtonText } from '../../Buttons/ButtonText'
import { EmailSentContainer } from '../../../containers/Authorization/EmailSentContainer'
import { Input } from '../../FormComponents/Input'

type Props = {
  email: string,
  userId: string,
  emailRepeat: Function,
  changeEmail: Function,
  openSuccessMessage: Function,
  t: Function
}

type State = {
  isEmailChanging: boolean,
  newEmail: string
}

export class Confirm extends Component<Props, State> {
  static propTypes = {
    email: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    emailRepeat: PropTypes.func.isRequired,  
    changeEmail: PropTypes.func.isRequired,
    openSuccessMessage: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  constructor () {
    super ()
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
  
  takeInput = (field: { name: string, value: string }) => {
    this.setState({[field.name]: field.value})
  }
  
  sendNewEmail = (event: SyntheticEvent<Form>) => {
    event.preventDefault ()
    this.props.changeEmail(this.state.newEmail)
      .then(() => this.onChangeEmail())
      .then(() => this.props.openSuccessMessage(this.props.t('registration.confirm.mailChangedMessage')))
  }

  render () {
    const { t } = this.props
    let email = 
      <Text secondary>
        {t('registration.confirm.didWrong')}  <ButtonText type='button' onClick={this.onChangeEmail}>
          {t('registration.confirm.change')}
        </ButtonText>
      </Text>

    if (this.state.isEmailChanging) {
      email = 
        <Form onSubmit={this.sendNewEmail}>
          <InputContainer>
            <Input
              name='newEmail'
              type='email'
              takeValue={this.takeInput}
              label='Email'
              spaceBetween
            />
          </InputContainer>
          <Button type='submit'>
            {t('registration.confirm.send')}
          </Button>
        </Form>
    }

    return (
        <EmailSentContainer 
          text={t('registration.confirm.emailSent')}
          email={this.props.email}
          emailRepeat={this.props.emailRepeat}
        >
        {email}
      </EmailSentContainer>
    )
  }
}

const Text = styled.p`
margin: 0;
margin-bottom: 65px;
text-align: center;
line-height: 25px;
font-size: 18px;
width: 100%;
@media (min-width: 800px) {
  ${props => !props.secondary && 'width: 700px'};
}
@media (min-width: 500px) {
  ${props => props.secondary && 'width: 400px'};
}
${props => props.secondary ? 
  'color: var(--cool-grey);' : 
  'color: var(--grey-purple);'}
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
@media (min-width: 620px) {
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
}
`

const InputContainer = styled.div`
flex-grow: 1;
margin-bottom: 40px;
@media (min-width: 620px) {
margin-bottom: 0;
}
width: 100%;
max-width: 400px;
`
