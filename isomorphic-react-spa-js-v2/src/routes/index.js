import Layout from 'components/layout';
import Home from './home';
import Profile from './profile';

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
                component: Home,
                path: '*',
                type: 'common'
            }
        ]
    }
];

export default routeConfig;