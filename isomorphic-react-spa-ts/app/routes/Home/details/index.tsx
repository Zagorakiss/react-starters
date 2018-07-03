import * as React from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';

class Home extends React.Component<RouteComponentProps<any>, {}> {

    public render(): JSX.Element {
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="block block_from">from</div>
                            <div className="block block_to">to</div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;
