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
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

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

	renderErrorMessage() {
		if (this.props.error && this.props.error !== '') {
			return (
				<div className="error-text-block error-text-block_centered">
					{this.props.error}
				</div>
			);
		}
		return null;
	}

	renderCheckbox() {
		// return (
		//     <div className="checkbox checkbox_login">
		//         <input type="checkbox" id="remember-me" className="checkbox__input"
		//                 value={this.state.rememberMe.value} checked={this.state.rememberMe.value}
		//                 onChange={this.handleChangeRememberMe}/>
		//         <label htmlFor="remember-me" className="checkbox__label">
		//             <div className="checkbox__label__box">
		//                 <i className="checkbox__icon icon-check3" aria-hidden="true"/>
		//             </div>
		//             <div className="checkbox__label__text">{i18n('Remember me')}</div>
		//         </label>
		//     </div>
		// );
		return null;
	}

	renderLoginForm() {
		const {t, isFetching} = this.props;
		return (
			// <Form onSubmit={this.handleSubmit}>
			// 	<h2>Email</h2>
			// 	<input
			// 		onChange={this.handleInputChange}
			// 		type="email"
			// 		name="email"
			// 		placeholder="type email"
			// 	/>
			// 	<h2>Password</h2>
			// 	<input
			// 		onChange={this.handleInputChange}
			// 		type="password"
			// 		name="password"
			// 		placeholder="type password"
			// 	/>
			// 	<button
			// 		type="submit"
			// 		disabled={isFetching}>
			// 	>
			// 		Submit
			// 	</button>
			// </Form>
			<div className="container-fluid">
				<div className="row">
					<div className="login-container">
						<div className="login">
							<div className="login__title">Login</div>
							<form onSubmit={this.handleSubmit}
								className={`login__form ${this.props.error === '401' || this.props.error === '404' || this.props.error === '400' || this.props.error === '500' ? ' login__form_error' : ''}`}>
								<div className="login__field-group">
									<div
										className={`login__field-container login__field-container_email`}>
										<input
											onChange={this.handleInputChange}
											type="email"
											name="email"
											placeholder="Username or email address"
											className="login__field"
										/>
									</div>
									<div
										className={`login__field-container login__field-container_password`}>
										<input
											onChange={this.handleInputChange}
											type="password"
											name="password"
											placeholder="Password"
											className="login__field"
										/>
									</div>
									{/* <button type="button" className="login__forgot-pass" onClick={this.props.setActiveModal.bind(this, 4)}>Fotgot Password?</button> */}
								</div>
								{this.renderErrorMessage()}
								{/* {this.renderCheckbox()} */}
								<div className="login__btn-group">
									<button
										type="submit"
										disabled={isFetching}
										className="button login__btn"
									>
										{`Login`}
									</button>
									<Link
										to="/resetpass"
										className="login__link"
									>
										{`Forgot your password ?`}
									</Link>
									<Link
										to="/register"
										className="button login__btn login__btn_big"
									>
										{`Create an account`}
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render () {
		if (!this.props.isAuth) {
			return (
				<div>
					<Helmet>
						<title>Blockchain.ru - Map of Projects</title>
					</Helmet>
					{this.renderLoginForm()}
				</div>
			);
		}
		return (
			<Redirect to="/" push={true}/>
		);
		// this.props.history.push('/');
		// return null;
	}
}

Login.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	// openPopup: PropTypes.func.isRequired,
	tfaNeeded: PropTypes.bool,
	tfaType: PropTypes.string,
	loginWithTfa: PropTypes.func,
	token: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string
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