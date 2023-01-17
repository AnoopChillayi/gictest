import { Alert, AlertTitle, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ titleMessage, errorMessage, retryAction = null }) => {
    return (
        <Alert severity="error">
            <AlertTitle>{titleMessage}</AlertTitle>
            {errorMessage}
            <Button onClick={retryAction}>Retry</Button>
        </Alert>
    );
};

ErrorDisplay.propTypes = {
    titleMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    retryAction: PropTypes.func
};
export default ErrorDisplay;
