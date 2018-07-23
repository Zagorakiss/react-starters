// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../Buttons'
import { Input } from '../../FormComponents/Input'

type Props = {
  login: Function,
  email: string,
  openPopup: Function,
  isFetching: boolean,
  t: Function,
  openError: Function
}

type State = {
  email: string,
  password: string
}

export class LoginForm extends Component<Props, State> {
  static propTypes = {
    login: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    openPopup: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  constructor (props: Props) {
    super (props)
    this.state = {
      email: props.email,
      password: ''
    }
  }

  handleSubmit = (event: SyntheticEvent<Form>) => {
    const { login, openError, t } = this.props
    event.preventDefault()
    const result = {
      email: this.state.email,
      password: this.state.password
    }
    login(result)
      .catch(error => {
        if (!error.text) {
          openError(t('login.unknownError'))
        }
      })
  }

  takeInput = (field: { name: string, value: string }) => {
    this.setState({[field.name]: field.value})
  }

  render () {
    const { t } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          name='email'
          type='email'
          takeValue={this.takeInput}
          label='Email'
          placeholder='example@mail.com'
          required
          autoFocus
        />
        <Input
          name='password'          
          type='password'
          takeValue={this.takeInput}
          label={t('login.passwordLabel')}
          pattern='.{9,}'
          required 
        />
        <Button 
          type='submit'
          disabled={this.props.isFetching}>
          {t('login.login')}
        </Button>
      </Form>
    )
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 320px;
`
