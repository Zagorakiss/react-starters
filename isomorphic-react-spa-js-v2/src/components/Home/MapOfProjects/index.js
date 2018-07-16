import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from '../../../config/i18n';

// @translate('authorization');

class MapOfProjects extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    render () {
        const {t, isAuth, isFetching} = this.props;
        return (
            <div>
                <h1>MapOfProjects Component</h1>
                <h2>{`isAuth: ${isAuth}`}</h2>
                {t('login.heading')}
                <button
                    onClick={() => i18n.changeLanguage('ru')}
                >
                    Сменить язык на русский
                </button>
                <button
                    onClick={() => i18n.changeLanguage('en')}
                >
                    Сменить язык на английский
                </button>
            </div>
        )
    }
}

// MapOfProjects.propTypes = {
//   isAuth: PropTypes.bool.isRequired,
//   login: PropTypes.func.isRequired,
//   t: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
//   openPopup: PropTypes.func.isRequired,
//   tfaNeeded: PropTypes.bool.isRequired,
//   tfaType: PropTypes.string.isRequired,
//   loginWithTfa: PropTypes.func.isRequired,
//   token: PropTypes.object.isRequired,
//   isFetching: PropTypes.bool.isRequired
// };

export default translate('authorization')(MapOfProjects);
