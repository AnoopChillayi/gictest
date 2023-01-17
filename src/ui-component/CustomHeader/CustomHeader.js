import { useTheme } from '@emotion/react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import config from 'config';
import LogoSection from 'layout/MainLayout/LogoSection';

const CustomHeader = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: theme.palette.background.default,
                py: { xs: theme.spacing(1), sm: theme.spacing(2) }
            }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography noWrap sx={{ flexGrow: 1, typography: { sm: 'h2', xs: 'h5' } }}>
                    <LogoSection path={config.homePath} />
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default CustomHeader;
