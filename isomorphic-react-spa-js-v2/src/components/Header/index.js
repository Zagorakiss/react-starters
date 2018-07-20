import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
import MenuItem from './menu-item';
import {Link} from 'react-router-dom';

class Header extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    // componentWillMount() {
	// }

	toggleSearch = () => {
		console.log('Search button clicked');
	}

	toggleLangDropdown = () => {
		console.log('Lang button clicked');
	}

    render () {
        const {t, isAuth, isFetching} = this.props;
        return (
			<header
				className={`header`}
				id="header"
			>
				<Link to="/">
					<div className="header__logo" />
				</Link>
				<div className="menu">
					<ul className={`menu__list`}>
						<MenuItem>
							<button onClick={this.toggleLangDropdown} className="menu__link menu__link_lang">
								{`EN`}
							</button>
						</MenuItem>
						<MenuItem authRequired={false} isAuth={isAuth}>
							<button onClick={this.toggleSearch} className="menu__link menu__link_search">
								<span className="menu__icon icon-search" />
							</button>
						</MenuItem>
						<MenuItem isAuth={isAuth} fallbackLink={`/login/`} mainLink={`/profile/`}>
							<span className="menu__icon icon-star" />
						</MenuItem>
						<MenuItem isAuth={isAuth} fallbackLink={`/login/`} mainLink={`/profile/`}>
							<span className="menu__icon icon-user" />
						</MenuItem>
						{/* <MenuItem authRequired={true} isAuth={isAuth}>
							<button onClick={this.toggleSearch} className="menu__link">
								<span className="icon-search" />
							</button>
						</MenuItem> */}
					</ul>
				</div>
				{/* <div className="header__control">
					{this.langDropdown()}
				</div> */}
			</header>
        )
    }
}

Header.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
	email: PropTypes.string,
	token: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	env: PropTypes.object
};

export default translate('header')(Header);
