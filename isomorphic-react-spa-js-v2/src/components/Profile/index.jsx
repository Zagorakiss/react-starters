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

	renderFavorites = () => {
		const {favorites} = this.props;
		return (
			<div className="favorites">
				<div className="project-block">
					{`Favorites: ${favorites.length}`}
				</div>
				{favorites.map((item, key) => {
					return (
						<div className="project-block" key={key}>
							<div className="project-block__param">
								{item.name}
							</div>
							<div className="project-block__param">
								{`key: ${item.key}`}
							</div>
							<div className="project-block__param">
								{`marketcap: ${item.marketcap}`}
							</div>
							<div className="project-block__param">
								{`industry: ${item.industry}`}
							</div>
							<div className="project-block__param">
								{`price: ${item.price}`}
							</div>
							<div className="project-block__param">
								{`consensusAlgorithm: ${item.consensusAlgorithm}`}
							</div>
							<div className="project-block__param">
								{`year: ${item.year}`}
							</div>
							<div className="project-block__param">
								{`stage: ${item.stage}`}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	renderLogoutButton = () => {
		return (
			<button
				className="button button_profile"
				onClick={this.logout}
			>
				{`Logout`}
			</button>
		)
	}

    render () {
        const {t, isAuth, token, logout, isFetching, isProfileFetching, dataLoaded, email, favorites} = this.props;
        return (
			<div className="profile-container">
				<div className="profile">
					<div className="profile__header">
						<div className="user">
							<div className="user__left">
								<div className="user__image">
									<span class="user__icon icon-profile2" />
								</div>
								<div className="user__info">
									<div className="user__email">
										{email}
									</div>
									<div className="user__date">
										на сайте с 29 июня 2018 г.
									</div>
								</div>
							</div>
							<div className="user__right">
								{this.renderLogoutButton()}
							</div>
						</div>
					</div>
					<div className="profile__content">
						<div className="tabs-container">
							<div className="tabs">
								<div className="tabs__list">
									<div className="tabs__item tabs__item_active">
										Favorites
									</div>
									<div className="tabs__item">
										Other
									</div>
								</div>
							</div>
						</div>
						<div className="favorites-container">
							{!isProfileFetching && dataLoaded &&
								this.renderFavorites()
							}
						</div>
					</div>
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
