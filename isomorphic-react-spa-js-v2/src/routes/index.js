import Layout from 'components/layout';
import Home from './home';

const routeConfig = [
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
