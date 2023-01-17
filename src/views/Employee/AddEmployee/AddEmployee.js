import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    AlertTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { ERROR_MESSAGES, ROUTE_PATHS } from 'appConstants';
import MainCard from 'ui-component/cards/MainCard';
import { employeeService } from 'services/employeeService.service';
import { useForm, Controller } from 'react-hook-form';
import CustomTextField from 'ui-component/CustomTextField/CustomTextField';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router';

const AddEmployee = () => {
    const params = useParams();
    const [addEmployeeInProgress, setAddEmployeeInProgress] = useState(false);
    const [addEmployeeError, setAddEmployeeError] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();

    const getEmployeeDetails = async (empId) => {
        setAddEmployeeInProgress(true);
        try {
            const getEmployeeResponse = await employeeService.getEmployeeDetails(empId);
            reset(getEmployeeResponse);
        } catch (error) {
            setAddEmployeeError(typeof error === 'string' ? error : ERROR_MESSAGES.SERVER_ERROR);
        } finally {
            setAddEmployeeInProgress(false);
        }
    };

    useEffect(() => {
        if (params?.id) {
            getEmployeeDetails(params.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.id]);

    const onSubmit = async (e) => {
        setAddEmployeeInProgress(true);
        try {
            if (params?.id) {
                const updateEmployeeResponse = await employeeService.updateEployeeDetails(params?.id, { ...e, empId: params?.id });
            } else {
                const addEmployeeResponse = await employeeService.createEmployee(e);
            }

            navigate(`/${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.LIST}`);
        } catch (error) {
            setAddEmployeeError(typeof error === 'string' ? error : ERROR_MESSAGES.SERVER_ERROR);
        } finally {
            setAddEmployeeInProgress(false);
        }
    };
    return (
        <MainCard title="Add Employee">
            <Box component="form" maxWidth="sm" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                <CustomTextField
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'First Name Required',
                        maxLength: {
                            value: 10,
                            message: 'Maximum length is 10 charecters'
                        },
                        maxLength: {
                            value: 6,
                            message: 'Minimum length is 6 charecters'
                        }
                    }}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    // autoFocus
                />
                <FormHelperText error={errors?.firstName} sx={{ mb: 2 }}>
                    {errors?.firstName?.message}
                </FormHelperText>

                <CustomTextField
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Last Name Required',
                        maxLength: {
                            value: 10,
                            message: 'Maximum length is 10 charecters'
                        },
                        maxLength: {
                            value: 6,
                            message: 'Minimum length is 6 charecters'
                        }
                    }}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    // autoFocus
                />
                <FormHelperText error={errors?.lastName} sx={{ mb: 2 }}>
                    {errors?.lastName?.message}
                </FormHelperText>

                <CustomTextField
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Email address required',
                        maxLength: {
                            value: 100,
                            message: 'Maximum length is 150 charecters'
                        }
                    }}
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                <FormHelperText error={errors?.email}>{errors?.email?.message}</FormHelperText>

                <CustomTextField
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Phone Number required'
                    }}
                    required
                    fullWidth
                    type="phone"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                />
                <FormHelperText error={errors?.phone}>{errors?.phone?.message}</FormHelperText>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <Controller
                        rules={{ required: 'Gender Required' }}
                        required
                        control={control}
                        errors={errors}
                        name="gender"
                        id="gender"
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText error={errors?.gender}>{errors?.gender?.message}</FormHelperText>
                </FormControl>

                <Stack direction="row" spacing={6} alignItems="center" sx={{ mt: 2, mb: 2 }}>
                    <LoadingButton type="submit" variant="contained" color="inherit" loading={addEmployeeInProgress} loadingPosition="end">
                        <Typography sx={{ fontWeight: 'bold' }}> {params?.id ? 'Update Employee' : 'Add Employee'}</Typography>
                    </LoadingButton>
                </Stack>

                {addEmployeeError && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {addEmployeeError}
                    </Alert>
                )}
            </Box>
        </MainCard>
    );
};

export default AddEmployee;