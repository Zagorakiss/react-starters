import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from '../../../config/i18n';

class Filter extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // Now moved to the parent component
            // filter: {
            //     isVisible: true,
            //     params: {}
            // },
            // data: {
            //     rawData: {},
            //     filteredData: {}
            // }
        }
    }

    // Now moved to the parent component
    // toggleFilter = () => {
    //     this.setState(() => {
    //         return {
    //             ...this.state,
    //             filter: {
    //                 ...this.state.filter,
    //                 isVisible: this.state.filter.isVisible ? false : true
    //             }
    //         };
    //     });
    // }

    renderCheckbox(paramGroup, paramName, labelText) {
        const {setParam} = this.props;
        const {capital, consensus, price, years} = this.props.filter.params;
        return (
            <div className="checkbox">
                <input
                    type="checkbox"
                    id={paramName}
                    className="checkbox__input"
                    // value={this.state.rememberMe.value}
                    checked={this.props.filter.params[paramGroup][paramName]}
                    // onChange={setParam(paramGroup, paramName, event.target.value)}
                    onChange={this.props.filter.params[paramGroup][paramName] ? () => setParam(paramGroup, paramName, false) : () => setParam(paramGroup, paramName, true)}
                />
                <label
                    htmlFor={paramName}
                    className="checkbox__label"
                >
                    <div className="checkbox__label__box" />
                    <div className="checkbox__label__text">{labelText}</div>
                </label>
            </div>
        );
        // return null;
    }

    renderField(paramGroup, paramName, placeholderText) {
        const {setParam} = this.props;
        const {capital, consensus, price, years} = this.props.filter.params;
        return (
            <div
                className="filter__field-container">
                <input
                    onChange={(event) => setParam(paramGroup, paramName, event.target.value)}
                    type="text"
                    name={paramName}
                    placeholder={placeholderText}
                    className="filter__field"
                    spellCheck="false"
                />
            </div>
        );
    }

    render () {
        const {t, isAuth, email, isFetching} = this.props;
        const {filter, data, toggleFilter} = this.props;
        return (
            <div className={`filter-container ${filter.isVisible ? '' : 'is-closed'}`}>
                <div className={`filter ${filter.isVisible ? '' : 'is-closed'}`}>
                    <div className="filter__top">
                        <div className="filter__title">
                            <span className="filter__title__icon icon-filter-custom" />
                            <span className="filter__title__text">Фильтры</span>
                        </div>
                        <button
                            className="filter__toggle"
                            onClick={toggleFilter}
                        >
                            <span className="filter__toggle__icon icon-cross" />
                        </button>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block filter__block_link active">
                            <div className="filter__block__title">Общая Капитализация</div>
                            <div className="filter__block__subtitle">[1 234 проекта]</div>
                            <span className="filter__block__arrow icon-arrow-filter" />
                        </div>
                        <div className="filter__block filter__block_link">
                            <div className="filter__block__title">Индустрия 1</div>
                            <div className="filter__block__subtitle">[123 проекта]</div>
                            <span className="filter__block__arrow icon-arrow-filter" />
                        </div>
                        <div className="filter__block filter__block_link">
                            <div className="filter__block__title">Индустрия 2</div>
                            <div className="filter__block__subtitle">[123 проекта]</div>
                            <span className="filter__block__arrow icon-arrow-filter" />
                        </div>
                        <div className="filter__block filter__block_link">
                            <div className="filter__block__title">Индустрия 3</div>
                            <div className="filter__block__subtitle">[123 проекта]</div>
                            <span className="filter__block__arrow icon-arrow-filter" />
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Капитализация</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('capital', 'min', '123')}
                                {this.renderField('capital', 'max', '123456')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Капитализация</div>
                            <div className="filter__block__content">
                                {this.renderCheckbox('capital', 'checkbox1', 'pre-ICO')}
                                {this.renderCheckbox('capital', 'checkbox2', 'pre-ICO')}
                                {this.renderCheckbox('capital', 'checkbox3', 'pre-ICO')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Стоимость</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('price', 'min', '123')}
                                {this.renderField('price', 'max', '12345678')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Года</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('years', 'min', '2010')}
                                {this.renderField('years', 'max', '2018')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Алгоритм консенсуса</div>
                            <div className="filter__block__content">
                                {this.renderCheckbox('consensus', 'checkbox4', 'pre-ICO')}
                                {this.renderCheckbox('consensus', 'checkbox5', 'pre-ICO')}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Filter.propTypes = {
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

export default translate('authorization')(Filter);
