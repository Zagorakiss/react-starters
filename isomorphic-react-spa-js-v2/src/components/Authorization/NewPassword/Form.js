// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from '../../FormComponents/Input'
import { Button } from '../../Buttons'

type Props = {
  onSubmit: Function,
  isChanged: boolean,
  uuid: string,
  openErrorMessage: Function,
  isFetching: boolean,
  t: Function
}

type State = {
  passwordFirst: string,
  passwordSeconds: string
}

export class Form extends Component<Props, State> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isChanged: PropTypes.bool.isRequired,
    uuid: PropTypes.string.isRequired,
    openErrorMessage: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  constructor () {
    super ()
    this.state = {
      passwordFirst: '',
      passwordSeconds: ''
    }
  }

  takeInput = (field: { name: string, value: string }) => {
    this.setState({[field.name]: field.value})
  }

  onSubmit = (event: SyntheticEvent<FormContainer>) => {
    event.preventDefault()
    if (this.state.passwordFirst === this.state.passwordSeconds) {
      const result = {
        uuid: this.props.uuid,
        pass: this.state.passwordFirst
      }
      this.props.onSubmit(result)
    } else {
      this.props.openErrorMessage(this.props.t('newPassword.dontMatch'))
    }
  }

  render () {
    const { t } = this.props
    if (this.props.isChanged) {
      return (
        <Button type='button' link to='/login'>
          {t('newPassword.login')}
        </Button>
      )
    }

    return (
      <FormContainer onSubmit={this.onSubmit}>
        <Input 
          name='passwordFirst'
          type='password'
          takeValue={this.takeInput} 
          label={t('newPassword.firstInputLabel')}
          pattern='[a-zA-Z0-9].{9,}'
          reqiered
        />
        <Input 
          name='passwordSeconds'
          type='password'          
          takeValue={this.takeInput} 
          label={t('newPassword.secondInputLabel')}       
          pattern='[a-zA-Z0-9].{9,}'
          reqiered          
        />
        <Button 
          type='submit'
          disabled={this.props.isFetching}>
          {t('newPassword.submit')}
        </Button>
      </FormContainer>
    )
  }
}

const FormContainer = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 100%;
height: 320px;
`
