// @flow 
import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Template } from '../Templates'
import { ButtonText } from '../../Buttons/ButtonText'
import { LetterIcon } from '../../Svg/LetterIcon'
import { translate } from 'react-i18next'

type Props = {
  text: string,
  email: string,
  emailRepeat: Function,
  openSuccessMessage: Function,
  openErrorMessage: Function,
  t: Function,
  children: React.Node
}

type State = {
  emailRepeated: boolean
}

@translate('authorization')
export class EmailSent extends React.Component<Props, State> {
  static propTypes = {
    text: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    emailRepeat: PropTypes.func.isRequired,
    openSuccessMessage: PropTypes.func.isRequired,
    openErrorMessage: PropTypes.func.isRequired    
  }
  
  constructor () {
    super ()
    this.state = {
      emailRepeated: false
    }
  }

  emailRepeat = () => {
    if (!this.state.emailRepeated) {
      this.props.emailRepeat()
        .then(() => {
          this.setState({
            emailRepeated: true
          })
        })
      this.props.openSuccessMessage(this.props.t('emailSent.emailRepeated'))
    } else {
      this.props.openErrorMessage(this.props.t('emailSent.emailRepeatedError'))      
    }
  }

  render () {
    const { t } = this.props
    return (
      <Template icon={<LetterIcon />} heading={t('emailSent.heading')} wide>
        <Text>
          {this.props.text}
          <Email>{this.props.email}</Email>
        </Text>
        <BreakLine />
        <Text secondary>
          {t('emailSent.text')} <ButtonText type='button' onClick={this.emailRepeat}>
            {t('emailSent.button')}
          </ButtonText>
        </Text>
        {this.props.children}
      </Template>
    )
  }
}

const Text = styled.p`
margin: 0;
margin-bottom: 45px;
text-align: center;
line-height: 25px;
font-size: 18px;
width: 100%;
@media (min-width: 640px) {
  ${props => !props.secondary && 'width: 640px'};
}
@media (min-width: 500px) {
  ${props => props.secondary && 'width: 400px'};
}
${props => props.secondary ? 
  'color: var(--cool-grey);' : 
  'color: var(--grey-purple);'}
`
const Email = styled.span`
  display: block;
  text-decoration: none;
  line-height: 25px;
  font-size: 18px;
  color: var(--charcoal-grey-two);
  word-wrap: break-word; 
`
const BreakLine = styled.div`
  margin-bottom: 45px;
  width: 100%;
  height: 1px;
  background-color: var(--pale-grey);
`
