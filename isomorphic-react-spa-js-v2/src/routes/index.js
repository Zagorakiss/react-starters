import Layout from 'components/layout';
import HomeRoute from './home';
import ProfileRoute from './profile';
import LoginRoute from './login';
import Page404 from './404';
import SignupRoute from './signup';
import RecoveryRoute from './recovery';
import NewPasswordRoute from './newpassword';
import EmailConfirmedRoute from './emailconfirmed';

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
            // {
            //     component: LoginRoute,
            //     path: '/login',
            //     exaxt: true,
            //     type: 'guest'
            // },
            {
                component: LoginRoute,
                path: '/login',
                exaxt: true,
                type: 'common'
            },
            {
                component: SignupRoute,
                path: '/signup',
                exaxt: true,
                type: 'guest'
            },
            {
                component: NewPasswordRoute,
                path: '/recovery/:uuid',
                type: 'guest'
            },
            {
                component: RecoveryRoute,
                path: '/recovery',
                exaxt: true,
                type: 'guest'
            },
            {
                component: EmailConfirmedRoute,
                path: '/email_confirmed',
                exaxt: true,
                type: 'common'
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
