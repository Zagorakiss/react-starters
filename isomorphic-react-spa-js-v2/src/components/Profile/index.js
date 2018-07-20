import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from '../../config/i18n';

class Profile extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
	}

	logout = () => {
		const {logout, t} = this.props;
		// event.preventDefault()
		logout()
			.catch(error => {
				if (!error.text) {
					// openError(t('login.unknownError'))
					console.warn(t('login.unknownError'));
				}
			})
	}

    render () {
        const {t, logout, email, isFetching, isAuth, token} = this.props;
        return (
			<div className="profile-container">
				<div className="profile">
					<h1 className="profile__title">Profile Component</h1>
					<button
						className="button button_common"
						onClick={this.logout}
					>
						{`Logout`}
					</button>
				</div>
			</div>
        )
    }
}

Profile.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	token: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired
};

export default translate('authorization')(Profile);
