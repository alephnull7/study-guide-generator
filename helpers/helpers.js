const base_url = 'https://yhh2mupveh.us-east-2.awsapprunner.com/api';
export const fetchDataFromAPI = async (route, token) => {
    try {
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            headers: {
                'Accept': `application/json`,
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Failed to fetch data');
        }
        return {
            status: response.status,
            body: await response.json()
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return {
            status: 500,
            body: {}
        };
    }
};

export const sendDataToAPI = async (route, method, data, token) => {
    try {
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Failed to fetch data');
        }
        return {
            status: response.status,
            body: await response.json()
        };
    } catch (error) {
        console.error('Error sending data:', error.message);
        return {
            status: 500,
            body: {}
        };
    }
};
