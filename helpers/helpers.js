/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for making requests to the back-end API
*/

import {Platform} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const base_url = 'https://yhh2mupveh.us-east-2.awsapprunner.com/api';
export const fetchDataFromAPI = async (route, authContext, retry = true) => {
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
        if (retry && authData !== null && response.status === 401) {
            await authenticate(authContext);
            return fetchDataFromAPI(route, authContext, false);
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

export const sendDataToAPI = async (route, method, data, authContext, retry = true) => {
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

        if (!response.ok) {
            console.log('Failed to fetch data');
        }
        if (retry && authData !== null && response.status === 401) {
            await authenticate(authContext);
            return sendDataToAPI(route, method, data, authContext, false);
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

export const fetchAndSavePDFFromAPI = async (route, authContext, entityName, retry = true) => {
    try {
        const fileName = `${entityName}.pdf`;
        const { authData } = authContext;
        const url = `${base_url}/${route}`;

        if (Platform.OS === 'web') {
            const response = await fetch(url, {
                headers: {
                    'Accept': `application/pdf`,
                    'Authorization': `Bearer ${authData?.token}`
                }
            });
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', fileName || 'example.pdf');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const downloadPath = FileSystem.documentDirectory;
            const headers = {
                Authorization: `Bearer ${authContext.authData.token}`
            };
            const downloadResumable = FileSystem.createDownloadResumable(
              url,
              downloadPath + fileName,
              { headers }
            );
            const { uri } = await downloadResumable.downloadAsync();
            await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
        }
        return {
            status: 204,
            body: { }
        };
    } catch (error) {
        console.error('Error getting PDF:', error.message);
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
