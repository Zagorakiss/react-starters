import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from '../../../config/i18n';

class Filter extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            filter: {
                industries: [
                    {
                        name: 'Общая Капитализация',
                        key: '',
                        amount: 1234,
                        active: true
                    },
                    {
                        name: 'Финансы',
                        key: 'finance',
                        amount: 123,
                        active: false
                    },
                    {
                        name: 'Технологии',
                        key: 'technology',
                        amount: 123,
                        active: false
                    },
                    {
                        name: 'Индустрии',
                        key: 'industry',
                        amount: 123,
                        active: false
                    }
                ]
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter.params.industry !== nextProps.filter.params.industry) {
            this.setState(() => {
                return {
                    ...this.state,
                    filter: {
                        ...this.state.filter,
                        industries: this.state.filter.industries.map((item, key) => {
                            return (
                                {
                                    name: item.name,
                                    key: item.key,
                                    amount: item.amount,
                                    active: item.key === nextProps.filter.params.industry.value
                                }
                            )
                        })
                    }
                };
            });
        }
    }

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

    renderField(paramGroup, paramName, placeholderText, labelText) {
        const {setParam} = this.props;
        const {capital, consensus, price, years} = this.props.filter.params;
        return (
            <div
                className="filter__field-container">
                <div className="filter__label">{labelText}</div>
                <input
                    onChange={(event) => setParam(paramGroup, paramName, event.target.value)}
                    type="text"
                    name={paramName}
                    placeholder={placeholderText}
                    className="filter__field"
                    spellCheck="false"
                    value={this.props.filter.params[paramGroup][paramName]}
                />
            </div>
        );
    }

    render () {
        const {t, isAuth, email, isFetching} = this.props;
        const {filter, data, toggleFilter, setParam} = this.props;
        const {industries} = this.state.filter;
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
                        {industries.map((item, key) => {
                            return (
                                <div
                                    className={`filter__block filter__block_link ${item.active ? 'active' : ''}`}
                                    onClick={() => setParam('industry', 'value', item.key)}
                                    key={key}
                                >
                                    <div className="filter__block__title">{item.name}</div>
                                    <div className="filter__block__subtitle">{`[${item.amount} проекта]`}</div>
                                    <span className="filter__block__arrow icon-arrow-filter" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Капитализация</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('marketcap', 'min', '123', 'от')}
                                {this.renderField('marketcap', 'max', '123456', 'до')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Стадия</div>
                            <div className="filter__block__content">
                                {this.renderCheckbox('stage', 'preIco', 'pre-ICO')}
                                {this.renderCheckbox('stage', 'ico', 'ICO')}
                                {this.renderCheckbox('stage', 'tokenized', 'Tokenized')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Стоимость</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('price', 'min', '123', 'от')}
                                {this.renderField('price', 'max', '12345678', 'до')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Года</div>
                            <div className="filter__block__content filter__block__content_fields">
                                {this.renderField('year', 'min', '2010', 'от')}
                                {this.renderField('year', 'max', '2018', 'до')}
                            </div>
                        </div>
                    </div>
                    <div className="filter__block-container">
                        <div className="filter__block">
                            <div className="filter__block__title">Алгоритм консенсуса</div>
                            <div className="filter__block__content">
                                {this.renderCheckbox('consensusAlgorithm', 'pos', 'PoS')}
                                {this.renderCheckbox('consensusAlgorithm', 'pow', 'PoW')}
                                {this.renderCheckbox('consensusAlgorithm', 'poa', 'PoA')}
                                {this.renderCheckbox('consensusAlgorithm', 'poc', 'PoC')}
                            </div>
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
