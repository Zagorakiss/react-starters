// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from './Form'
import { Template } from '../Templates/index';
import { LockIcon } from '../../Svg/LockIcon'
import { Description } from '../Templates/Description'
import { translate } from 'react-i18next'

type Props = {
  newPassword: Function,
  match: { params: {uuid: string}},
  openErrorMessage: Function,
  isFetching: boolean,
  t: Function
}

type State = {
  isChanged: boolean
}

@translate('authorization')
export class NewPassword extends Component<Props, State> {
  static propTypes = {
    newPassword: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    openErrorMessage: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  constructor () {
    super ()
    this.state = {
      isChanged: false
    }
  }

  onSubmit = (data: {}) => {
    this.props.newPassword(data)
      .then(() => this.setState({isChanged: true}))
  }

  render () {
    const { t } = this.props
    let description: string = t('newPassword.resetText')
    if (this.state.isChanged) {
      description = t('newPassword.changedText')
    }

    return (
      <Template
        heading={t('newPassword.heading')}
        icon={<LockIcon />}>
        <TextMargin>
          <Description>
            {description}
          </Description>
        </TextMargin>
        <Form
          onSubmit={this.onSubmit}
          isChanged={this.state.isChanged}
          uuid={this.props.match.params.uuid}
          openErrorMessage={this.props.openErrorMessage}
          isFetching={this.props.isFetching}
          t={this.props.t} />
      </Template>
    )
  }
}

const TextMargin = styled.div`
margin-bottom: 40px;
`