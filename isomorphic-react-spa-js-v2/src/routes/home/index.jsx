import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {FilterContainer} from '../../containers/Home/FilterContainer';
import {MapOfProjectsContainer} from '../../containers/Home/MapOfProjectsContainer';
// import {projects} from 'constants/projects';
import {projects} from 'constants/projects/complex-obj';
import {setFilteredData} from '../../redux/actions/filter';
import {translate} from 'react-i18next';
import i18n from '../../config/i18n';
import {ColorBar} from 'components';

const mapStateToProps = state => {
    const {filteredData, rawData} = state.filter;
    return {
        filteredData,
        rawData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilteredData: filteredData => {
            return dispatch(setFilteredData(filteredData))
        }
    }
}

class HomeRoute extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            filter: {
                isVisible: false,
                params: this.getInitialParams(),
            },
            data: {
                rawData: {},
                filteredData: {}
            }
        }
    }

    getInitialParams = () => {
        return {
            isChanged: false,
            marketcap: {
                min: '',
                max: ''
            },
            stage: {
                preIco: false,
                ico: false,
                tokenized: false
            },
            price: {
                min: '',
                max: ''
            },
            year: {
                min: '',
                max: ''
            },
            consensusAlgorithm: {
                pos: false,
                pow: false,
                poa: false,
                poc: false
            },
            industry: {
                value: ''
            }
        }
    }

    resetParams = () => {
        const currentParams = _.get(this.state, `filter.params`, {});
        delete currentParams.isChanged;
        const initialParams = this.getInitialParams();
        delete initialParams.isChanged;
        if (!_.isEqual(currentParams, initialParams)) {
            this.setState(() => {
                return {
                    ...this.state,
                    filter: {
                        ...this.state.filter,
                        params: this.getInitialParams()
                    }
                };
            },
                () => this.props.setFilteredData([])
            );
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
                        isChanged: true,
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
                    isVisible: !this.state.filter.isVisible
                }
            };
        });
    }

    toggleSelectedParams = () => {
        this.setState(() => {
            return {
                ...this.state,
                filter: {
                    ...this.state.filter,
                    params: {
                        ...this.state.filter.params,
                        isChanged: !this.state.filter.params.isChanged
                    }
                }
            };
        });
    }

    // Need to rework later
    // renderSelectedParamsItems = (params) => {
    //     Object.keys(params).map((paramKey) => {
    //         if (Object.keys(params[paramKey]).some((k) => {
    //                 return params[paramKey][k]
    //         })) {
    //             Object.keys(params[paramKey]).map((item) => {
    //                 return (
    //                     <div className="selected-params__item">
    //                         1
    //                         {`${paramKey} -`}
    //                         {params[paramKey][item] && `${params[paramKey][item]}`}
    //                         {`;`}
    //                     </div>
    //                 )
    //             })
    //         }
    //     })
    // }

    renderSelectedParams = () => {
        const {params} = this.state.filter;
        const {t} = this.props;
        return (
            <div className={`selected-params ${params.isChanged ? '' : 'closed'}`}>
                <div className="selected-params__title">
                    {t('selectedParams.title')}
                </div>
                <div className="selected-params__list">
                    {/* Need to rework later */}
                    {/* {this.renderSelectedParamsItems(params)} */}
                    {(params.industry.value) &&
                        <div className="selected-params__item">
                            {` ${t(`selectedParams.${params.industry.value}`)}`}
                            {`;`}
                        </div>
                    }
                    {(params.marketcap.min || params.marketcap.max) &&
                        <div className="selected-params__item">
                            {`${t('selectedParams.marketcap')} -`}
                            {params.marketcap.min && ` ${t('selectedParams.min')} ${params.marketcap.min}`}
                            {params.marketcap.max && ` ${t('selectedParams.max')} ${params.marketcap.max}`}
                            {`;`}
                        </div>
                    }
                    {(params.stage.tokenized || params.stage.ico || params.stage.preIco) &&
                        <div className="selected-params__item">
                            {`${t('selectedParams.stage')} -`}
                            {params.stage.preIco && ` pre-ICO;`}
                            {params.stage.ico && ` ICO;`}
                            {params.stage.tokenized && ` Tokenized;`}
                        </div>
                    }
                    {(params.price.min || params.price.max) &&
                        <div className="selected-params__item">
                            {`${t('selectedParams.price')} -`}
                            {params.price.min && ` ${t('selectedParams.min')} ${params.price.min}`}
                            {params.price.max && ` ${t('selectedParams.max')} ${params.price.max}`}
                            {`;`}
                        </div>
                    }
                    {(params.year.min || params.year.max) &&
                        <div className="selected-params__item">
                            {`${t('selectedParams.years')} -`}
                            {params.year.min && ` ${t('selectedParams.min')} ${params.year.min}`}
                            {params.year.max && ` ${t('selectedParams.max')} ${params.year.max}`}
                            {`;`}
                        </div>
                    }
                    {(params.consensusAlgorithm.pow || params.consensusAlgorithm.pos || params.consensusAlgorithm.poa || params.consensusAlgorithm.poc) &&
                        <div className="selected-params__item">
                            {`${t('selectedParams.consensusAlgorithm')} -`}
                            {params.consensusAlgorithm.pos && ` PoS;`}
                            {params.consensusAlgorithm.pow && ` PoW;`}
                            {params.consensusAlgorithm.poa && ` PoA;`}
                            {params.consensusAlgorithm.poc && ` PoC;`}
                        </div>
                    }
                </div>
                <div className="selected-params__btn-container">
                    <button
                        className="selected-params__btn"
                        onClick={this.applyFilter}
                    >
                        {t('buttons.apply')}
                    </button>
                    <button
                        className="selected-params__btn selected-params__btn_reset"
                        onClick={this.resetParams}
                    >
                        {t('buttons.reset')}
                    </button>
                </div>
                <button
                    className="selected-params__toggle"
                    onClick={() => this.toggleSelectedParams()}
                >
                    <span class={`selected-params__toggle__icon ${params.isChanged ? 'icon-minus-square' : 'icon-plus-square'}`} />
                </button>
            </div>
        )
    }

    applyFilter = () => {
        const currentParams = _.get(this.state, `filter.params`, {});
        delete currentParams.isChanged;
        const initialParams = this.getInitialParams();
        delete initialParams.isChanged;
        if (!_.isEqual(currentParams, initialParams)) {
            // Our data and params
            const {params} = this.state.filter;
            // Let's filter the data by checking an every item
            const filteredData = _.cloneDeep(projects);
            Object.keys(filteredData).forEach((year) => {
                Object.keys(filteredData[year]).forEach((project) => {
                    let valid = true;
                    Object.keys(params).forEach((paramKey) => {
                        // Some common checkers
                        const item = filteredData[year][project];
                        const examineFields = () => {
                            if (
                                Object.keys(params[paramKey]).some((k) => {
                                    return params[paramKey][k].length
                                })
                            ) {
                                if (
                                    params[paramKey].min &&
                                    params[paramKey].max &&
                                    (Number(params[paramKey].min) <= item[paramKey] && item[paramKey] <= Number(params[paramKey].max))
                                ) {
                                    // is valid
                                } else if (
                                    params[paramKey].min &&
                                    !params[paramKey].max &&
                                    item[paramKey] >= Number(params[paramKey].min)
                                ) {
                                    // is valid
                                } else if (
                                    !params[paramKey].min &&
                                    params[paramKey].max &&
                                    item[paramKey] <= Number(params[paramKey].max)
                                ) {
                                    // is valid
                                } else {
                                    valid = false
                                }
                            }
                        };
                        const examineCheckboxes = () => {
                            if (
                                Object.keys(params[paramKey]).every((k) => {
                                    // console.log(params[paramKey][k]);
                                    return !params[paramKey][k]
                                }) ||
                                params[paramKey][item[paramKey]]
                            ) {
                                // is valid
                            } else {
                                valid = false;
                            }
                        };
                        const examineStringValue = () => {
                            if (params[paramKey].value) {
                                if (params[paramKey].value !== item[paramKey]) {
                                    valid = false
                                }
                            }
                        };
                        // Let's go
                        if (valid) {
                            if (paramKey === 'isChanged') {
                                // do nothing
                            } else if (paramKey === 'marketcap') {
                                examineFields();
                            } else if (paramKey === 'price') {
                                examineFields();
                            } else if (paramKey === 'year') {
                                examineFields();
                            } else if (paramKey === 'industry') {
                                examineStringValue();
                            } else if (paramKey === 'consensusAlgorithm') {
                                examineCheckboxes();
                            } else if (paramKey === 'stage') {
                                examineCheckboxes();
                            } else {
                                valid = false;
                            }
                        }
                    });
                    if (!valid) {
                        delete filteredData[year][project];
                    }
                })
            });
            this.props.setFilteredData(filteredData);
            this.setState(() => {
                return {
                    ...this.state,
                    filter: {
                        ...this.state.filter,
                        params: {
                            ...this.state.filter.params,
                            isChanged: false
                        }
                    }
                };
            });
        }
    }

    render() {
        const {t} = this.props;
        const {filter, data} = this.state;
        return (
            <div className="home-container">
                <button
                    className={`filter-toggle ${filter.isVisible ? 'is-hidden' : ''}`}
                    onClick={this.toggleFilter}
                >
                    <span className="filter-toggle__icon icon-filter-custom" />
                    <span className="filter-toggle__text">
                        {t('buttons.filters')}
                    </span>
                    <span className="filter-toggle__icon filter-toggle__icon_arrow icon-arrow-filter" />
                </button>
                <FilterContainer
                    filter={filter}
                    data={data}
                    toggleFilter={this.toggleFilter}
                    setParam={this.setParam}
                />
                <MapOfProjectsContainer />
                {/* {filter.params.isChanged && this.renderSelectedParams()} */}
                {this.renderSelectedParams()}
                <ColorBar />
            </div>
        );
    }

}

// export default HomeRoute;
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(HomeRoute);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    translate('home')(HomeRoute)
);
