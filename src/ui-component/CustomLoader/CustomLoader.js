import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomLoader = ({ show, message = 'Loading', hideMessage = false }) => {
    if (!show) {
        return null;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {!hideMessage && <Typography variant="h7">{message}</Typography>}
            <CircularProgress color="primary" />
        </Box>
    );
};
CustomLoader.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string,
    hideMessage: PropTypes.bool
};

export default CustomLoader;
