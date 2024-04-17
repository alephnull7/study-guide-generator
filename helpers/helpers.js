const base_url = 'https://yhh2mupveh.us-east-2.awsapprunner.com/api';
export const fetchDataFromAPI = async (route) => {
    try {
        const url = `${base_url}/${route}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
};

export const sendDataToAPI = async (route, method, data) => {
    try {
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Failed to fetch data');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
};
