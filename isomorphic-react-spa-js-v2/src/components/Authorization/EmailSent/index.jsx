import * as React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Template} from '../Templates'
import {translate} from 'react-i18next'
import {NotificationContainer} from 'react-notifications';
import {createNotification} from 'utils';

class EmailSent extends React.PureComponent {

  constructor (props) {
    super(props)
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
      createNotification('success', this.props.t('emailSent.emailRepeated'), 'Success')
    } else {
      createNotification('success', this.props.t('emailSent.emailRepeatedError'), 'Success')
    }
  }

  render () {
    const {t} = this.props
    return (
      <div>
        <Text>
          {this.props.text}
          <Email>{this.props.email}</Email>
        </Text>
        <BreakLine />
        <Text secondary>
          {t('emailSent.text')}
          <button
            type="button"
            onClick={this.emailRepeat}
            className="login__btn login__btn_text"
          >
            {t('emailSent.button')}
          </button>
        </Text>
        {this.props.children}
        <NotificationContainer />
      </div>
    )
  }
}

EmailSent.propTypes = {
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailRepeat: PropTypes.func.isRequired
}

export default translate('authorization')(EmailSent);

const Text = styled.p`
margin: 0;
margin-bottom: 45px;
text-align: center;
font-size: 16px;
line-height: 1.4;
width: 100%;
`
const Email = styled.span`
  display: block;
  text-decoration: none;
  line-height: 1.4;
  font-size: 16px;
  color: #655cf7;
  word-wrap: break-word; 
`
const BreakLine = styled.div`
  margin-bottom: 45px;
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
`
