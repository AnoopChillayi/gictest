export function handleResponse(response) {
    return response.text().then((text) => {
        if (response.ok) {
            const data = text && JSON.parse(text);
            return data;
        } else {
            try {
                const data = text && JSON.parse(text);
                const error = (data && data.info) || response.statusText || 'Server Error, Please try again..';
                return Promise.reject(error);
            } catch (e) {
                return Promise.reject(`${response.status}:${response.statusText}`);
            }
        }
    });
}

export const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

export const fetchWrapper = (endPoint, reqOptions) => {
    return fetch(endPoint, reqOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
};
