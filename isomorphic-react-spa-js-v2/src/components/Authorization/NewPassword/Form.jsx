import * as React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {NotificationContainer} from 'react-notifications';
import {createNotification} from 'utils';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';

class Form extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      passwordFirst: '',
      passwordSeconds: ''
    }
  }

  takeInput = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.passwordFirst === this.state.passwordSeconds) {
      const result = {
        uuid: this.props.uuid,
        pass: this.state.passwordFirst
      }
      this.props.onSubmit(result)
    } else {
      createNotification('error', this.props.t('newPassword.dontMatch'), 'Error')
    }
  }

  render () {
    const {t} = this.props
    if (this.props.isChanged) {
      return (
        <Link
          to="/login"
          className="button login__btn login__btn_auto"
        >
          {t('newPassword.login')}
        </Link>
      )
    }

    return (
      <form
        onSubmit={this.onSubmit}
        className={`login__form`}
      >
        <div className="login__field-group">
          <div className={`login__field-container login__field-container_password`}>
            <input
              name="passwordFirst"
              type="password"
              onChange={this.takeInput}
              label={t('newPassword.firstInputLabel')}
              placeholder={t('newPassword.firstInputLabel')}
              pattern="[a-zA-Z0-9].{9,}"
              required
              className="login__field"
            />
          </div>
          <div className={`login__field-container login__field-container_password`}>
            <input
              name="passwordSeconds"
              type="password"
              onChange={this.takeInput}
              label={t('newPassword.secondInputLabel')}
              placeholder={t('newPassword.secondInputLabel')}
              pattern="[a-zA-Z0-9].{9,}"
              required
              className="login__field"
            />
          </div>
          <div className="login__btn-group">
            <button
              type="submit"
              disabled={this.props.isFetching}
              className="button login__btn login__btn_auto"
            >
              {t('newPassword.submit')}
            </button>
          </div>
        </div>
        <NotificationContainer />
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isChanged: PropTypes.bool.isRequired,
  uuid: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('authorization')(Form);

const FormContainer = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 100%;
height: 320px;
`
