import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
// import scrollUp from 'utils';
// import FilteredList from 'components';
import projects from 'constants/projects';

class MapOfProjects extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    // static fetchData(dispatch) {
    //     return getProjects(dispatch);
    // }

    // static fetchData(dispatch, params, url) {
    //     const id = url.split('/').slice(-1)[0];
    //     return getProject(dispatch, {id});
    // }

    componentWillMount() {
        // if (!this.props.env.isServerSide) {
        //     getProject({id});
        // }
        if (process.env.BROWSER) {
            window.scrollTo(0, 0);
        }
    }

    componentDidMount() {
      console.dir(projects);
    }

    render () {
        const {t, isAuth, isFetching} = this.props;
        return (
            <div className="map-container">
				<div className="map">
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
					<span className="icon-user" />
					{/* <FilteredList items={projectsList} predicate={item => item.year}>
						{item => <div key={item.key}>{item.name}</div>}
					</FilteredList> */}
				</div>
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
