import * as React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Form from './Form'
import {Template} from '../Templates/index';
import {Description} from '../Templates/Description'
import {translate} from 'react-i18next';
import {NotificationContainer} from 'react-notifications';
import {createNotification, urlUtils} from 'utils';

class NewPassword extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      isChanged: false
    }
  }

  onSubmit = (data) => {
    this.props.newPassword(data)
      .then(() => this.setState({isChanged: true}))
      .catch(() => createNotification('error', this.props.t('newPassword.wrongUuid'), 'Error'))
  }

  render () {
    const {t} = this.props;
    let description = t('newPassword.resetText');
    if (this.state.isChanged) {
      description = t('newPassword.changedText');
    }
    let uuid = '';
    if (process.browser) {
      uuid = urlUtils.getEndpoint(window.location.pathname);
    }

    return (
      <div className="login-container">
        <div className="login login_newpassword">
          <div className="login__title">{t('newPassword.heading')}</div>
          <TextMargin>
            <div className="login__text">
              {description}
            </div>
          </TextMargin>
          <Form
            onSubmit={this.onSubmit}
            isChanged={this.state.isChanged}
            // uuid={this.props.match.params.uuid}
            uuid={uuid}
            isFetching={this.props.isFetching}
            t={this.props.t} />
        </div>
        <NotificationContainer />
      </div>
    )
  }
}

NewPassword.propTypes = {
  newPassword: PropTypes.func.isRequired,
  // match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default translate('authorization')(NewPassword);

const TextMargin = styled.div`
margin-bottom: 40px;
`