const base_url = 'https://yhh2mupveh.us-east-2.awsapprunner.com/api';
export const fetchDataFromAPI = async (route, authContext) => {
    try {
        const { authData } = authContext;
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            headers: {
                'Accept': `application/json`,
                'Authorization': `Bearer ${authData?.token}`
            }
        });
        if (!response.ok) {
            console.log('Failed to fetch data');
        }
        if (authData !== null && response.status === 401) {
            await authenticate(authContext);
            return fetchDataFromAPI(route, authContext);
        }
        return {
            status: response.status,
            body: response.status === 204 ? {} : await response.json()
        };
    } catch (error) {
        console.log('Error fetching data:', error.message);
        return {
            status: 500,
            body: {}
        };
    }
};

export const sendDataToAPI = async (route, method, data, authContext) => {
    try {
        const { authData } = authContext;
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData?.token}`
            },
            body: JSON.stringify(data),
        });
        console.log(response);

        if (!response.ok) {
            console.log('Failed to fetch data');
        }
        if (authData !== null && response.status === 401) {
            await authenticate(authContext);
            return sendDataToAPI(route, method, data, authContext);
        }
        return {
            status: response.status,
            body: response.status === 204 ? {} : await response.json()
        };
    } catch (error) {
        console.log('Error sending data:', error.message);
        return {
            status: 500,
            body: {}
        };
    }
};

export const authenticate = async (authContext) => {
    try {
        const { authData, setAuthData } = authContext;
        const url = `${base_url}/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: authData.username,
                password: authData.password
            }),
        });
        console.log(response);

        if (!response.ok) {
            console.error('Failed to fetch token');
        } else {
            console.log('New token received');
            setAuthData({
                ...authData,
                token: response.body.token
            });
        }
        return {
            status: response.status,
            body: response.status === 204 ? {} : await response.json()
        };
    } catch (error) {
        console.error('Error getting token:', error.message);
        return {
            status: 500,
            body: {}
        };
    }
};
