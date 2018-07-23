import * as React from 'react';
import {Link} from 'react-router-dom';

const MenuItem = (props) => {
    if (props.authRequired && !props.isAuth) {
        return null;
    } else
    if (props.fallbackLink && props.mainLink) {
        if (props.isAuth) {
            return (
                <li className="menu__item">
                    <Link to={props.mainLink} className="menu__link">
                        {props.children}
                    </Link>
                </li>
            );
        }
        return (
            <li className="menu__item">
                <Link to={props.fallbackLink} className="menu__link">
                    {props.children}
                </Link>
            </li>
        );
    }
    return (
        <li className="menu__item">
            {props.children}
        </li>
    );
};

MenuItem.defaultProps = {
    authRequired: false
};

export default MenuItem;
