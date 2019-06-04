import * as React from 'react';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
import numeral from 'numeral';
import * as _ from 'lodash';

// const Popup = (props) => {
class Popup extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            related_projects: {
                isOpened: false
            },
            partner_projects: {
                isOpened: false
            },
            social_activity: {
                isOpened: false
            }
        }
        this.distance = 38;
        this.modalWidth = 460;
        this.modalHeight = 525;
    }

    renderSocialLink = (socialName) => {
        switch (socialName) {
            case 'tw':
                return (
                    <span className="socials__icon icon-twitter" />
                );
            case 'fb':
                return (
                    <span className="socials__icon icon-facebook" />
                );
            case 'tg':
                return (
                    <span className="socials__icon icon-telegram1" />
                );
            case 'vk':
                return (
                    <span className="socials__icon icon-vk" />
                );
            default:
                return 0;
        }
    };

    toggleList = (listType) => {
        this.setState({
            ...this.state,
            [listType]: {
                isOpened: !this.state[listType].isOpened
            }
        });
    };

    renderShowBtn = (listType) => {
        if (this.state[listType].isOpened) {
            return (
                <button
                    className="projects__btn"
                    onClick={() => this.toggleList(listType)}
                >
                    <span className="projects__btn__icon icon-angle-up" />
                    <span className="projects__btn__text">Свернуть</span>
                </button>
            );
        }
        return (
            <button
                className="projects__btn"
                onClick={() => this.toggleList(listType)}
            >
                <span className="projects__btn__icon icon-angle-down" />
                <span className="projects__btn__text">{`Показать все [${this.props.data[listType].length}]`}</span>
            </button>
        );
    }

    renderPostsList = (postsArray, listType) => {
        if (this.state[listType].isOpened) {
            return (
                <div className="posts__list">
                    {postsArray.map((item, key) => {
                        return (
                            <div className="posts__item" key={key}>
                                <div
                                    className="posts__item__logo"
                                    style={{backgroundImage: `url(${item.logo})`}}
                                />
                                <div className="posts__item__date">{item.date}</div>
                                <div className="posts__item__text">{item.text}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="posts__list">
                {
                    postsArray.length >= 1 &&
                    <div className="posts__item">
                        <div
                            className="posts__item__logo"
                            style={{backgroundImage: `url(${postsArray[0].logo})`}}
                        />
                        <div className="posts__item__date">{postsArray[0].date}</div>
                        <div className="posts__item__text">{postsArray[0].text}</div>
                    </div>
                }
                {
                    postsArray.length >= 2 &&
                    <div className="posts__item">
                        <div
                            className="posts__item__logo"
                            style={{backgroundImage: `url(${postsArray[1].logo})`}}
                        />
                        <div className="posts__item__date">{postsArray[1].date}</div>
                        <div className="posts__item__text">{postsArray[1].text}</div>
                    </div>
                }
                {
                    postsArray.length >= 3 &&
                    <div className="posts__item">
                        <div
                            className="posts__item__logo"
                            style={{backgroundImage: `url(${postsArray[2].logo})`}}
                        />
                        <div className="posts__item__date">{postsArray[2].date}</div>
                        <div className="posts__item__text">{postsArray[2].text}</div>
                    </div>
                }
            </div>
        );
    }

    render () {
        console.log(this.props.data);
        const {t, coords} = this.props;
        // const {
        //     name, // string
        //     key, // string
        //     // coords, // object
        //     consensusAlgorithm, // string
        //     description, // string
        //     industry, // string
        //     logo, // string(url href)
        //     marketcap, // number
        //     marketcap_change, // object
        //     partner_projects, // array of objects
        //     price, // number
        //     price_change, // object
        //     related_projects, // array of objects
        //     site, // string(url href)
        //     social_activity, // array of objects
        //     social_links, // object
        //     stage, // string
        //     year // number
        // } = this.props.data;
        const name = _.get(this.props.data, `name`, '[Name]');
        const key = _.get(this.props.data, `key`, '[KEY]');
        const description = _.get(this.props.data, `description`, '[description]');
        const logo = _.get(this.props.data, `logo`, '');
        const marketcap = _.get(this.props.data, `marketcap`, '?');
        const marketcap_change = _.get(this.props.data, `marketcap_change`, {});
        const partner_projects = _.get(this.props.data, `partner_projects`, []);
        const price = _.get(this.props.data, `price`, '?');
        const price_change = _.get(this.props.data, `price_change`, {});
        const related_projects = _.get(this.props.data, `related_projects`, []);
        const site = _.get(this.props.data, `site`, '');
        const social_activity = _.get(this.props.data, `social_activity`, []);
        const social_links = _.get(this.props.data, `social_links`, {});

        // Coords defining
        let top, left;
        if (coords.y + this.modalHeight < window.document.documentElement.scrollHeight - 77) {
            top = coords.y;
        } else {
            top = coords.y - this.modalHeight;
        }
        if (coords.x + this.distance + this.modalWidth < window.innerWidth) {
            left = coords.x + this.distance;
        } else {
            left = coords.x - this.distance - this.modalWidth;
        }
        return (
            <div
                className="popup"
                style={{
                    top,
                    left
                }}
            >
                <button
                    onClick={this.props.handleClose}
                    className="popup__closer"
                >
                    <span className="popup__closer__icon icon-cross" />
                </button>
                <div className="popup__head">
                    <div className="popup__head__logo" style={{backgroundImage: `url(${logo})`}} />
                    <div className="popup__head__name">{name}</div>
                    <div className="popup__head__key">{`[${key}]`}</div>
                    <button className="popup__head__favorite">
                        <span className="popup__head__favorite__icon icon-star" />
                    </button>
                </div>
                <div className="popup__content">
                    <div className="popup__values">
                        <div className="popup__value popup__value_price">
                            <div className="popup__value__title">{t('popup.price')}</div>
                            <div className="popup__value__num">
                                {numeral(price).format('$0,0.00')}
                            </div>
                            <div className={`popup__value__change ${price_change.trend}`}>
                                <div className="trend">
                                    <span className="trend__icon icon-arrow-up" />
                                </div>
                                <div className="percent">
                                    {numeral(price_change.percents).format('0.00')}%
                                </div>
                                <div className="usd">
                                    {price_change.trend === 'up' ? '+' : '-'}{numeral(price_change.usd).format('$0.00')}
                                </div>
                            </div>
                        </div>
                        <div className="popup__value popup__value_marketcap">
                            <div className="popup__value__title">{t('popup.cap')}</div>
                            <div className="popup__value__num">
                                {/* {numeral(marketcap).format('($0,0 a)')} */}
                                {numeral(marketcap).format('($0,0)')}
                            </div>
                            <div className={`popup__value__change ${marketcap_change.trend}`}>
                                <div className="trend">
                                    <span className="trend__icon icon-arrow-up" />
                                </div>
                                <div className="percent">
                                    {numeral(marketcap_change.percents).format('0.00')}%
                                </div>
                                <div className="usd">
                                    {marketcap_change.trend === 'up' ? '+' : '-'}{numeral(marketcap_change.usd).format('$0.00')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup__info popup__info_main">
                        <div className="popup__info__title">
                            {t('popup.info')}
                        </div>
                        <a href={site} className="popup__info__link">{site}</a>
                        <div className="socials">
                                {Object.keys(social_links).map((item, key) => {
                                    return (
                                        <a
                                            href={social_links[item]}
                                            className="socials__link"
                                            key={key}
                                        >
                                            {this.renderSocialLink(item)}
                                        </a>
                                    );
                                })}
                        </div>
                        <div className="popup__info__desc">
                            {description}
                        </div>
                    </div>
                    <div className="popup__info popup__info_related">
                        <div className="popup__info__title">
                            {t('popup.relatedProjects')}
                        </div>
                        <div className="projects">
                            <div className={`projects__list ${this.state.related_projects.isOpened ? 'big' : 'small'}`}>
                                {related_projects.map((item, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className="projects__item"
                                            style={{backgroundImage: `url(${item.logo})`}}
                                            title={item.key}
                                        />
                                    );
                                })}
                            </div>
                            {(related_projects.length > 7) && this.renderShowBtn('related_projects')}
                        </div>
                    </div>
                    <div className="popup__info popup__info_partners">
                        <div className="popup__info__title">
                            {t('popup.partnerProjects')}
                        </div>
                        <div className="projects">
                            <div className={`projects__list ${this.state.partner_projects.isOpened ? 'big' : 'small'}`}>
                                {partner_projects.map((item, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className="projects__item"
                                            style={{backgroundImage: `url(${item.logo})`}}
                                            title={item.key}
                                        />
                                    );
                                })}
                            </div>
                            {(partner_projects.length > 7) && this.renderShowBtn('partner_projects')}
                        </div>
                    </div>
                    <div className="popup__info popup__info_social-activity">
                        <div className="popup__info__title">
                            {t('popup.socialActivity')}
                        </div>
                        <div className="posts">
                            {this.renderPostsList(social_activity, 'social_activity')}
                            {(social_activity.length > 3) && this.renderShowBtn('social_activity')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default Popup;
export default translate('home')(Popup);