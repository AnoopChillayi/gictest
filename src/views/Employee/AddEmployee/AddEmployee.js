import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ERROR_MESSAGES, ROUTE_PATHS } from 'appConstants';
import MainCard from 'ui-component/cards/MainCard';
import { employeeService } from 'services/employeeService.service';
import { useForm, Controller } from 'react-hook-form';
import CustomTextField from 'ui-component/CustomTextField/CustomTextField';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router';
import ErrorDisplay from 'ui-component/ErrorDisplay/ErrorDisplay';
import { usePrompt } from 'hooks/usePrompt';
import SaveIcon from '@mui/icons-material/Save';

const AddEmployee = () => {
    const params = useParams();
    const [addEmployeeInProgress, setAddEmployeeInProgress] = useState(false);
    const [addEmployeeError, setAddEmployeeError] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset
    } = useForm();
    const navigate = useNavigate();

    usePrompt('Hello from usePrompt -- Are you sure you want to leave?', isDirty && !isSubmitting);
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
                <FormHelperText error={!!errors?.firstName} sx={{ mb: 2 }} variant="outlined">
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
                <FormHelperText error={!!errors?.lastName} sx={{ mb: 2 }}>
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
                        },

                        validate: (value) => {
                            return (
                                [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/].every((pattern) => pattern.test(value)) ||
                                'Please enter valid mail'
                            );
                        }
                    }}
                    required
                    fullWidth
                    type="text"
                    id="email"
                    label="Email Address"
                    name="email"
                />

                <FormHelperText error={!!errors?.email}>{errors?.email?.message}</FormHelperText>

                <CustomTextField
                    control={control}
                    errors={errors}
                    rules={{
                        required: 'Phone Number required',

                        validate: (value) => {
                            return (
                                [/\+65(6|8|9)\d{7}/g].every((pattern) => pattern.test(value)) ||
                                'Please enter valid Singapore Phone ,Eg:+6561234567'
                            );
                        }
                    }}
                    required
                    fullWidth
                    type="text"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                />
                <FormHelperText error={!!errors?.phone}>{errors?.phone?.message}</FormHelperText>

                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                    rules={{ required: 'Gender Required' }}
                    required
                    defaultValue=""
                    control={control}
                    name="gender"
                    id="gender"
                    render={({ field }) => (
                        <RadioGroup {...field}>
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    )}
                />

                <FormHelperText error={!!errors?.gender}>{errors?.gender?.message}</FormHelperText>

                <Stack direction="row" spacing={6} alignItems="center" sx={{ mt: 2, mb: 2 }}>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="inherit"
                        loading={addEmployeeInProgress}
                        loadingPosition="end"
                        endIcon={<SaveIcon />}
                    >
                        <Typography sx={{ fontWeight: 'bold' }}> {params?.id ? 'Update Employee' : 'Add Employee'}</Typography>
                    </LoadingButton>
                </Stack>

                {addEmployeeError && <ErrorDisplay titleMessage={ERROR_MESSAGES.EMPLOYEE_ADD_ERROR} errorMessage={addEmployeeError} />}
            </Box>
        </MainCard>
    );
};

export default AddEmployee;
