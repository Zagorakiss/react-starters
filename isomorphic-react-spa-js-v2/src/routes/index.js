import Layout from 'components/layout';
import HomeRoute from './home';
import ProfileRoute from './profile';
import LoginRoute from './login';
import Page404 from './404';

const routeConfig = [
    {
        component: Layout,
        routes: [
            {
                component: HomeRoute,
                path: '/',
                exact: true,
                type: 'common'
            },
            {
                component: ProfileRoute,
                path: '/profile',
                exact: true,
                type: 'protected'
            },
            {
                component: LoginRoute,
                path: '/login',
                exaxt: true,
                type: 'guest'
            },
            {
                component: Page404,
                path: '*',
                type: 'common'
            }
        ]
    }
];

export default routeConfig;
