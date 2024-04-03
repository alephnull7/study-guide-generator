const base_url = 'https://yhh2mupveh.us-east-2.awsapprunner.com/api';
const fetchDataFromAPI = async (route) => {
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

export default fetchDataFromAPI;