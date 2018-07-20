import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
// import scrollUp from 'utils';
// import FilteredList from 'components';

// @translate('authorization');

const projectsList = [
    {
      "name": "Bitcoin",
      "key": "BTC",
      "industry": "first",
      "year": 2009,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin Cash",
      "key": "BTC",
      "industry": "second",
      "year": 2011,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "second",
      "year": 2012,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "third",
      "year": 2014,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "third",
      "year": 2013,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin",
      "key": "BTC",
      "industry": "first",
      "year": 2014,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "first",
      "year": 2015,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "first",
      "year": 2016,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "first",
      "year": 2017,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin Cash",
      "key": "BTC",
      "industry": "second",
      "year": 2018,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "second",
      "year": 2017,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "third",
      "year": 2016,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "third",
      "year": 2013,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin",
      "key": "BTC",
      "industry": "first",
      "year": 2009,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "first",
      "year": 2010,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin Cash",
      "key": "BTC",
      "industry": "second",
      "year": 2011,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "second",
      "year": 2012,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "third",
      "year": 2014,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "fifth",
      "year": 2012,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin",
      "key": "BTC",
      "industry": "first",
      "year": 2011,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "fifth",
      "year": 2015,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "fourth",
      "year": 2016,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "first",
      "year": 2017,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
    {
      "name": "Bitcoin Cash",
      "key": "BTC",
      "industry": "second",
      "year": 2009,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Litecoin",
      "key": "LTC",
      "industry": "fourth",
      "year": 2017,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-d13e8cd1113fac484b6d88297ed7b840.png"
    },
    {
      "name": "Zcash",
      "key": "ZCH",
      "industry": "fourth",
      "year": 2016,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-b1b91bc348392a27c59fc61d4153a72e.png"
    },
    {
      "name": "Waves",
      "key": "WAVES",
      "industry": "fourth",
      "year": 2013,
      "marketcap": 130.84,
      "logo": "https://s3.eu-central-1.amazonaws.com/bcwallet/mobile/resource_logo-c0f42fe6037e2ef5ac464d84fa8bcdab.png"
    },
]

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
                <span className="icon-user" />
                {/* <FilteredList items={projectsList} predicate={item => item.year}>
                    {item => <div key={item.key}>{item.name}</div>}
                </FilteredList> */}
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
