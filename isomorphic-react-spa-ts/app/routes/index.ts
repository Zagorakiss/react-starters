import {RouteConfig} from 'react-router-config';
import Layout from 'components/Layout';
import {Home} from './Home';

const routeConfig: RouteConfig[] = [
    {
        component: Layout,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            }
        ]
    }
];

export default routeConfig;
