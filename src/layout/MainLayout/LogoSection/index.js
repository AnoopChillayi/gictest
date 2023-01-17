import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ path }) => (
    <ButtonBase disableRipple component={Link} to={path}>
        <Typography variant="h2" color="secondary">
            GIC
        </Typography>
    </ButtonBase>
);

LogoSection.propTypes = {
    path: PropTypes.string
};

export default LogoSection;
