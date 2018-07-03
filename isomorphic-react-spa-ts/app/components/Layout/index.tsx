import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Helmet} from 'react-helmet';
import {RouteConfig, renderRoutes} from 'react-router-config';
import {RouteComponentProps} from 'react-router-dom';
import {RouterState} from 'react-router-redux';
import {setUserDevice} from 'actions';
import {IStore} from 'models';
import {Header, Footer} from 'components';

interface ILayoutProps extends RouteComponentProps<void> {
    route: RouteConfig;
    router: RouterState;
}

class Layout extends React.Component<ILayoutProps, {}> {

    public constructor(props: ILayoutProps) {
        super(props);
    }

    // protected componentDidMount() {
    //     this.props.setUserDevice();
    // }

    public render(): JSX.Element {
        return (
            <div id="layout">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>
                        Title
                    </title>
                    <meta content="description" name="description"/>
                    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                    <meta content="telephone=no" name="format-detection"/>
                    <meta content="no" name="msapplication-tap-highlight"/>
                    <meta charSet="utf-8"/>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                </Helmet>
                <Header/>
                <div id="routes">
                    {renderRoutes(this.props.route && this.props.route.routes)}
                </div>
                <Footer/>
            </div>
        );
    }

}

export default Layout;
