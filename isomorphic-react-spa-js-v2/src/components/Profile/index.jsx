import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from '../../config/i18n';
import numeral from 'numeral';

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

	renderFavoritesDos = () => {
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
		const {t} = this.props;
		return (
			<button
				className="button button_profile"
				onClick={this.logout}
			>
				{t('header.logoutBtn')}
			</button>
		)
	}

	renderFavorites = () => {
		const {t, favorites} = this.props;
		return (
			<div className="favorites">
				{favorites.map((item, key) => {
					return (
						<div className="card" key={key}>
							<div className="card__image">
								<a href="#" type="button" className="card__image__btn">
									<img src={item.logo} alt="user-image" />
								</a>
							</div>
							<div className="card__modal">Take a look!</div>
							<div className="card__info">
								<div className="card__info__header">
									<div className="card__info__name">
										{`${item.name} [${item.key}]`}
									</div>
									<div className="card__info__price">
										{/* {`$${item.price}`} */}
										{numeral(item.price).format('$0,0.00')}
									</div>
									<div className={`card__info__price_change ${item.price_change.trend}`}>
										<div className="trend">
											<span className="trend__icon icon-arrow-up" />
										</div>
										<div className="percents">
											{numeral(item.price_change.percents).format('0.00')}%
										</div>
										<div className="usd">
											{item.price_change.trend === 'up' ? '+' : '-'}{numeral(item.price_change.usd).format('$0.00')}
										</div>
									</div>
								</div>
								<div className="card__info__social-networks">
									<a href="#" className="card__info__social-networks__icon twitter">
										<i className="fa fa-twitter" />
									</a>
									<a href="#" className="card__info__social-networks__icon facebook">
										<i className="fa fa-facebook" />
									</a>
								</div>
								<hr />
								<div className="card__info__content">
									<p>
										<b>{`${t('cards.description')}: `}</b>
										{item.description}
									</p>
									<p>
										<b>{`${t('cards.marketcap')}: `}</b>
										{`$${item.marketcap}`}
									</p>
									<p>
										<b>{`${t('cards.consensusAlgorithm')}: `}</b>
										{item.consensusAlgorithm}
									</p>
									<p>
										<b>{`${t('cards.industry')}: `}</b>
										{item.industry}
									</p>
									<p>
										<b>{`${t('cards.year')}: `}</b>
										{item.year}
									</p>
									<p>
										<b>{`${t('cards.stage')}: `}</b>
										{item.stage}
									</p>
									<p>
										<b>{`${t('cards.website')}: `}</b>
										<a className="card__link" href={item.site}>{item.site}</a>
									</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}

    render () {
        const {t, isAuth, token, logout, isFetching, isProfileFetching, dataLoaded, email, registrationDate, favorites} = this.props;
        return (
			<div className="profile-container">
				<div className="profile">
					<div className="profile__header">
						<div className="user">
							<div className="user__left">
								<div className="user__image">
									<span className="user__icon icon-profile2" />
								</div>
								<div className="user__info">
									<div className="user__email">
										{email}
									</div>
									<div className="user__date">
										{`${t('header.since')} ${registrationDate}`}
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
										{t('tabs.favorites')}
									</div>
									<div className="tabs__item">
										{t('tabs.others')}
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

export default translate('profile')(Profile);
