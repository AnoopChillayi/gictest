import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Button, Container, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ErrorDisplay from 'ui-component/ErrorDisplay/ErrorDisplay';
import CustomLoader from 'ui-component/CustomLoader/CustomLoader';
import { ERROR_MESSAGES, ROUTE_PATHS } from 'appConstants';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import { employeeService } from 'services/employeeService.service';
import { useTheme } from '@emotion/react';
import CustomDialog from 'ui-component/CustomDialog/CustomDialog';
import { EMPLOYEE_DELETE_MODAL } from '../UsersPageConstants';

const EmployeeList = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [employeeList, setEmployeeList] = useState(null);
    const [employeeListInProgress, setEmployeeListInProgress] = useState(false);
    const [employeeListError, setEmployeeListError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const employeeToDelete = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getemployeeList = async () => {
        setEmployeeListInProgress(true);
        try {
            const EmployeeResponse = await employeeService.getEmployeesList({
                currentPage: 1
            });
            setEmployeeList(EmployeeResponse);
            setEmployeeListError(null);
        } catch (error) {
            setEmployeeListError(typeof error === 'string' ? error : ERROR_MESSAGES.SERVER_ERROR);
        } finally {
            setEmployeeListInProgress(false);
        }
    };

    const addEmployee = () => {
        navigate(`/${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.ADD}`);
    };
    const goToEdit = (empId) => {
        navigate(`/${ROUTE_PATHS.EMPLOYEE}/${ROUTE_PATHS.EDIT}/${empId}`);
    };

    const handleDeleteEmployee = (empId) => {
        employeeToDelete.current = empId;
        setOpenDeleteModal(true);
    };

    const handleDeleteModalClose = (roleId) => {
        employeeToDelete.current = null;
        setOpenDeleteModal(false);
    };

    const deleteEmployee = async () => {
        setAnchorEl(null);

        //API call to delete the Employee

        setEmployeeListInProgress(true);
        try {
            const deleteEmployeeResponse = await employeeService.deleteEmployeeDetails(employeeToDelete.current);
            const newempListList = employeeList?.employees.filter((item) => item.empId != employeeToDelete.current);
            setEmployeeList({ ...employeeList, employees: newempListList });

            setEmployeeListError(null);
        } catch (error) {
            setEmployeeListError(typeof error === 'string' ? error : ERROR_MESSAGES.SERVER_ERROR);
        } finally {
            setEmployeeListInProgress(false);
            setOpenDeleteModal(false);
        }
    };

    useEffect(() => {
        getemployeeList();
    }, []);

    if (employeeListInProgress) {
        return <CustomLoader show={employeeListInProgress} />;
    }
    if (employeeListError) {
        return (
            <ErrorDisplay
                titleMessage={ERROR_MESSAGES.EMPLOYEE_LIST_LOADING_ERROR}
                errorMessage={employeeListError}
                retryAction={getemployeeList}
            />
        );
    }

    return (
        <MainCard title="Employee List">
            <CustomDialog
                open={openDeleteModal}
                onClose={handleDeleteModalClose}
                dialogTitleText={EMPLOYEE_DELETE_MODAL.TITLE_TEXT}
                contentText={EMPLOYEE_DELETE_MODAL.CONTENT_TEXT}
                agreeLabel={EMPLOYEE_DELETE_MODAL.AGREE_LABEL}
                cancelLabel={EMPLOYEE_DELETE_MODAL.CANCEL_LABEL}
                handleClose={handleDeleteModalClose}
                handleAgree={deleteEmployee}
                confirmText={EMPLOYEE_DELETE_MODAL.CONFIRM_TEXT}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" startIcon={<AddIcon />} color="inherit" sx={{ mb: 1, alignSelf: 'end' }} onClick={addEmployee}>
                    <Typography sx={{ fontWeight: 'bold' }}>Add Employee</Typography>
                </Button>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email Address</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeList?.employees?.map((emp) => (
                                <TableRow key={emp.empId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{emp.firstName}</TableCell>
                                    <TableCell>{emp.lastName}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phone}</TableCell>
                                    <TableCell>{emp.gender}</TableCell>

                                    <TableCell>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.mediumAvatar,
                                                    backgroundColor: theme.palette.grey[50],
                                                    color: theme.palette.secondary[200],
                                                    zIndex: 1
                                                }}
                                                aria-controls="menu-user-list"
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreHorizIcon fontSize="inherit" />
                                            </Avatar>
                                            <Menu
                                                id="menu-user-list"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                variant="selectedMenu"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <MenuItem onClick={() => goToEdit(emp.empId)}>
                                                    <PreviewIcon sx={{ mr: 1.75 }} /> Edit
                                                </MenuItem>

                                                <MenuItem onClick={() => handleDeleteEmployee(emp.empId)}>
                                                    <DeleteIcon sx={{ mr: 1.75 }} /> Delete
                                                </MenuItem>
                                            </Menu>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!employeeList?.employees?.length && (
                    <Container
                        maxWidth={'xs'}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 5 }}
                    >
                        <Typography variant="h1">No Employees Yet</Typography>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 5, width: 150 }} onClick={addEmployee}>
                            Add Employee
                        </Button>
                    </Container>
                )}
            </Box>
        </MainCard>
    );
};

export default EmployeeList;
