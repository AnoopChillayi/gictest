import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const CustomTextField = ({ control, errors, rules, name, ...rest }) => {
    return (
        <Controller
            name={name}
            defaultValue=""
            control={control}
            rules={rules ? rules : {}}
            render={({ field }) => (
                <TextField {...field} error={errors[name] ? true : false} data-testid={`text-field-${name}`} {...rest} />
            )}
        />
    );
};
CustomTextField.propTypes = {
    name: PropTypes.string,
    rules: PropTypes.object,
    errors: PropTypes.object,
    control: PropTypes.object
};
export default CustomTextField;
