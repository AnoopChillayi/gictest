import MinimalLayout from 'layout/MinimalLayout';
import NotFoundPage from 'ui-component/NotFoundPage/NotFoundPage';

// ==============================|| FALLBACK ROUTING ||============================== //

const FallbackRoutes = {
    path: '*',
    element: <MinimalLayout />,
    children: [
        {
            path: '*',
            element: <NotFoundPage />,
            target: true
        }
    ]
};

export default FallbackRoutes;
