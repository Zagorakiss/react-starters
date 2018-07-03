import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setUserDevice} from 'actions';
import {IStore} from 'models';

const mapDispatchToProps: (dispatch: Dispatch<IStore>, ownProps: IHeaderProps) => Partial<IHeaderProps> =
    (dispatch: Dispatch<IStore>, _ownProps: IHeaderProps): Partial<IHeaderProps> => ({
        setUserDevice: () => setUserDevice(dispatch)
    });

interface IHeaderProps {
    setUserDevice?: () => void;
}

class Header extends React.Component<IHeaderProps, any> {

    public componentDidMount() {
        this.props.setUserDevice();
    }

    public render(): JSX.Element {
        return (
            <header>
                Header
            </header>
        );
    }
}

export default connect(null, mapDispatchToProps)(Header);
