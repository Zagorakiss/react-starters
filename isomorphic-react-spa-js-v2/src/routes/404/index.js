import * as React from 'react';
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
        this.props.history.push('/');
    }

    render() {
        return null;
    }

}

export default Page404;
