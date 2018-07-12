import Layout from 'components/layout';
import Home from './home';
import Profile from './profile';
import {LoginContainer} from '../containers/Authorization/LoginContainer';

const routeConfig = [
    {
        component: Layout,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true,
                type: 'common'
            },
            {
                component: Profile,
                path: '/profile',
                exact: true,
                type: 'protected'
            },
            {
                component: LoginContainer,
                path: '/login',
                exaxt: true,
                type: 'guest'
            },
            {
                component: Home,
                path: '*',
                type: 'common'
            }
        ]
    }
];

export default routeConfig;
