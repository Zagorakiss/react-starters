import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Template } from '../Templates';
// import { CustomLink } from '../../CustomLink';
// import { LoginForm } from './LoginForm';
// import { LockIcon } from '../../Svg/LockIcon';
// import { TwoFactorInputContainer } from '../../../containers/TwoFactorInputContainer';
import {translate} from 'react-i18next';
// import i18n from '../../../config/i18n';

class Login extends React.PureComponent {

	constructor (props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = (event) => {
		const {login, t} = this.props;
		event.preventDefault()
		const result = {
			email: this.state.email,
			password: this.state.password
		}
		login(result)
			.catch(error => {
				if (!error.text) {
					// openError(t('login.unknownError'))
					console.warn(t('login.unknownError'));
				}
			})
	}

	handleInputChange = (event) => {
		console.dir(event.target);
		this.setState({[event.target.name]: event.target.value});
	}

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.tfaNeeded) {
  //     this.props.openPopup(
  //       <TwoFactorInputContainer
  //         action={this.loginWithTfa}
  //         type={nextProps.tfaType} />
  //     )
  //   }
  // }

  // loginWithTfa = (code) => {
  //   const data = {
  //     otp: code,
  //     token: this.props.token.access_token
  //   }
  //   return this.props.loginWithTfa(data)
  //     .then(() => { return Promise.resolve() })
  //     .catch(error => { return Promise.reject(error) })
  // }

	render () {
		const {t, isFetching} = this.props;
		return (
			<Form onSubmit={this.handleSubmit}>
				<h2>Email</h2>
				<input
					onChange={this.handleInputChange}
					type="email"
					name="email"
					placeholder="type email"
				/>
				<h2>Password</h2>
				<input
					onChange={this.handleInputChange}
					type="password"
					name="password"
					placeholder="type password"
				/>
				<button
					type="submit"
					disabled={isFetching}>
				>
					Submit
				</button>
			</Form>
		)
	}
}

Login.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	// openPopup: PropTypes.func.isRequired,
	tfaNeeded: PropTypes.bool.isRequired,
	tfaType: PropTypes.string.isRequired,
	loginWithTfa: PropTypes.func.isRequired,
	token: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired
};

export default translate('authorization')(Login);

// const FormContainer = styled.div`
//   margin-bottom: 25px;
//   width: 100%;
// `

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 320px;
`