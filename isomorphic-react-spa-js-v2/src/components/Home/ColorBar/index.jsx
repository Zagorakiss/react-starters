import * as React from 'react';
import {translate} from 'react-i18next';
import i18n from '../../../config/i18n';

class ColorBar extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            //
        }
    }

    render () {
        const {t} = this.props;
        return (
            <div className="bar">
                <div className="bar__title">
                    {t('colorBar.title')}
                </div>
                <div className="bar__line">
                    <div className="bar__line__point bar__line__point_max" />
                    <div className="bar__line__point bar__line__point_middle" />
                    <div className="bar__line__point bar__line__point_min" />
                    <div className="bar__line__value bar__line__value_max">
                        1 000 000 000 USD
                    </div>
                    <div className="bar__line__value bar__line__value_middle">
                        1 000 000 USD
                    </div>
                    <div className="bar__line__value bar__line__value_min">
                        1 000 USD
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('home')(ColorBar);
