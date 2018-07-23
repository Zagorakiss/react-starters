import * as React from 'react';
// import {connect} from 'react-redux';
import {FilterContainer} from '../../containers/Home/FilterContainer';
import {MapOfProjectsContainer} from '../../containers/Home/MapOfProjectsContainer';

class HomeRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            filter: {
                isVisible: true,
                params: {
                    capital: {
                        min: '',
                        max: '',
                        checkbox1: false,
                        checkbox2: false,
                        checkbox3: false
                    },
                    price: {
                        min: '',
                        max: ''
                    },
                    years: {
                        min: '',
                        max: ''
                    },
                    consensus: {
                        checkbox4: false,
                        checkbox5: false
                    }
                }
            },
            data: {
                rawData: {},
                filteredData: {}
            }
        }
    }

    setParam = (paramGroup, paramName, value) => {
        this.setState(() => {
            return {
                ...this.state,
                filter: {
                    ...this.state.filter,
                    params: {
                        ...this.state.filter.params,
                        [paramGroup]: {
                            ...this.state.filter.params[paramGroup],
                            [paramName]: value
                        }
                    }
                }
            };
        });
    }

    toggleFilter = () => {
        this.setState(() => {
            return {
                ...this.state,
                filter: {
                    ...this.state.filter,
                    isVisible: this.state.filter.isVisible ? false : true
                }
            };
        });
    }

    render() {
        const {filter, data} = this.state;
        return (
            <div className="home-container">
                <button
                    className={`filter-toggle ${filter.isVisible ? 'is-hidden' : ''}`}
                    onClick={this.toggleFilter}
                >
                    <span className="filter-toggle__icon icon-filter-custom" />
                    <span className="filter-toggle__text">Фильтры</span>
                    <span className="filter-toggle__icon filter-toggle__icon_arrow icon-arrow-filter" />
                </button>
                <FilterContainer
                    filter={filter}
                    data={data}
                    toggleFilter={this.toggleFilter}
                    setParam={this.setParam}
                />
                <MapOfProjectsContainer />
            </div>
        );
    }

}

export default HomeRoute;
