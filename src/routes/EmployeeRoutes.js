import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import { ROUTE_PATHS } from 'appConstants';

import EmployeeList from 'views/Employee/EmployeeList/EmployeeList';

import AddEmployee from 'views/Employee/AddEmployee/AddEmployee';
import { Navigate } from 'react-router';

// Employee Routing
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,

    children: [
        {
            path: `${ROUTE_PATHS.EMPLOYEE}`,
            element: <EmployeeList />,
            index: true
        },
        {
            path: `${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.LIST}`,
            element: <EmployeeList />
        },

        {
            path: `${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.ADD}`,
            element: <AddEmployee />
        },
        {
            path: `${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.EDIT}/:id`,
            element: <AddEmployee />
        },
        {
            path: `/`,
            element: <Navigate to={`/${ROUTE_PATHS.EMPLOYEE}`} />
        }
    ]
};

export default MainRoutes;
