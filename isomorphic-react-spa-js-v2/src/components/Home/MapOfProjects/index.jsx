import * as React from 'react';
// import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
// import scrollUp from 'utils';
// import FilteredList from 'components';
// import {projects} from 'constants/projects';
import {projects} from 'constants/projects/complex-obj'
import * as _ from 'lodash';
import Orbits from './orbits'

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
        // console.dir(projects);
    }

    renderTempBlock = () => {
        const {t, isAuth, isFetching} = this.props;
        return (
            <div className="tempBlock">
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
        )
        // return null
    }

    renderDevList = (data) => {
        const {t, isAuth, isFetching} = this.props;
        return (
            <div className="project-block-container">
                <div className="project-block">
                    {`Projects amount: ${data.length}`}
                </div>
                {data.map((item, key) => {
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

    // transformArray = (arr, itemKey) => {
    //     _.keyBy(arr, itemKey);
    // }

    dragMouseDown(e) {
        e.persist()
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = () => {
            this.closeDragElement(e);
        };
        // call a function whenever the cursor moves:
        document.onmousemove = () => {
            this.elementDrag(e)
        };
    }

    render () {
        const {t, isAuth, isFetching, filteredData} = this.props;
        const data = Object.keys(filteredData).length ? filteredData : projects;
        // const dataGroupedByYear = this.transformArray(array, 'year');

        return (
            <div
                ref={(el) => this.element = el}
                className="map-container"
            >
				<div className="map">
                    {/* {this.renderTempBlock()} */}
                    {/* {this.renderDevList(data)} */}
                    {
                        process.browser &&
                        <Orbits
                            data={data}
                        />
                    }
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

export default translate('home')(MapOfProjects);