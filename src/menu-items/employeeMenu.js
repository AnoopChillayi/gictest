// assets
import { IconDashboard } from '@tabler/icons';
import { ROUTE_PATHS } from 'appConstants';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const employeeMenu = {
    id: 'employee',
    title: 'Employee',
    type: 'group',
    children: [
        {
            id: 'add_mployee',
            title: 'Add',
            type: 'item',
            url: `/${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.ADD}`,
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'list_employee',
            title: 'List',
            type: 'item',
            url: `/${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.LIST}`,
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default employeeMenu;
