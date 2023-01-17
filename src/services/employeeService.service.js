import { API_END_POINTS } from 'appConstants';
import { fetchWrapper } from 'utils/utilsFunctions';

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const employeeService = {
    getEmployeesList,
    getEmployeeDetails,
    updateEployeeDetails,
    createEmployee,
    deleteEmployeeDetails
};

function getEmployeesList(requestBody) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const endPoint = API_END_POINTS.GET_EMPLOYEES_LIST;

    return fetchWrapper(`${BASE_URL}${endPoint}?` + new URLSearchParams(requestBody), requestOptions);
}

function getEmployeeDetails(empId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const endPoint = API_END_POINTS.GET_EMPLOYEEE_DETAILS;

    return fetchWrapper(`${BASE_URL}${endPoint}${empId}`, requestOptions);
}

function createEmployee(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    const endPoint = API_END_POINTS.ADD_EMPLOYEE_ROLE;

    return fetchWrapper(`${BASE_URL}${endPoint}`, requestOptions);
}

function updateEployeeDetails(empId, requestBody) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    const endPoint = API_END_POINTS.UPDATE_EMPLOYEE_DETAILS;

    return fetchWrapper(`${BASE_URL}${endPoint}${empId}`, requestOptions);
}

function deleteEmployeeDetails(empId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    const endPoint = API_END_POINTS.UPDATE_EMPLOYEE_DETAILS;

    return fetchWrapper(`${BASE_URL}${endPoint}${empId}`, requestOptions);
}
