import React, { useState, useEffect } from 'react';
import {Text, View} from "react-native";
import styles from "./styles";
import fetchDataFromAPI from '../helpers/helpers';

const ViewStudyGuidesView = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const newData = await fetchDataFromAPI('artifacts/study-guides/1');
            setData(newData);
            console.log(data);
        };
        fetchAndSetData();
    }, []);

    return(
        <View style={styles.container}>
        <Text style={styles.header}>User's Study Guides</Text>
            {data.map(item => (
                <View key={item._id}>
                    <Text>{item.name}</Text>
                    <Text>{item.content.text}</Text>
                </View>
            ))}
        </View>
    );
};

export default ViewStudyGuidesView;
