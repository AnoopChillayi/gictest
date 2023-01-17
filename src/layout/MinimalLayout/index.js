import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import CustomHeader from 'ui-component/CustomHeader/CustomHeader';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    const theme = useTheme();

    return (
        <Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CustomHeader />
            <Box sx={{ ...theme.typography.mainContent, marginTop: 0, minHeight: 'calc(100vh - 100px)' }}>
                <Outlet />
            </Box>
        </Fragment>
    );
};

export default MinimalLayout;
