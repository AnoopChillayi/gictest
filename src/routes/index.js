import { useRoutes } from 'react-router-dom';
import EmployeeRoutes from './EmployeeRoutes';
import FallbackRoutes from './FallbackRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function AppRoutes() {
    return useRoutes([EmployeeRoutes, FallbackRoutes]);
}
