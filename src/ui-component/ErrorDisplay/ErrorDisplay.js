import { Alert, AlertTitle, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ titleMessage, errorMessage, retryAction = null }) => {
    return (
        <Alert severity="error">
            <AlertTitle>{titleMessage}</AlertTitle>
            {errorMessage}
            {retryAction && <Button onClick={retryAction}>Retry</Button>}

            <AlertTitle>IN CASE IF YOU ARE NOT STARTED THE BACKEND API, PLEASE START IT BY MOVING TO demo-server folder</AlertTitle>
        </Alert>
    );
};

ErrorDisplay.propTypes = {
    titleMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    retryAction: PropTypes.func
};
export default ErrorDisplay;
