import * as React from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {Redirect} from 'react-router';
import {Validation, urlUtils} from 'utils';

class Page404 extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    componentWillMount() {
        // console.log(process.browser);
        // console.log(process.env.BROWSER);
        const testUrl = 'http://lalala.com';
        const ValidationPassed = Validation.init(testUrl, 'url');
        console.log(`Validation Passed = ${ValidationPassed}`);
        if (process.browser) {
            const endpoint = urlUtils.getEndpoint(window.location.pathname);
            console.log(`endpoint = ${endpoint}`);
            const urlParams = urlUtils.parseGetParams(window.location.href);
            console.dir(urlParams);
        }
        // this.props.history.push('/');
    }

    render() {
        // return null;
        return (
            <div className="error-page-container">
                <div className="error-page">
                    <h2 className="error-page__title">404 - Page not found</h2>
                    <Link
                        to="/"
                        className="button error-page__btn"
                    >
                        {`to Home Page`}
                    </Link>
                </div>
            </div>
        )
    }

}

export default Page404;
