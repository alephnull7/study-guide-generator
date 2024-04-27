import React, { useState, useEffect } from 'react';
import {Text, View, ScrollView} from "react-native";
import styles from "../styles/styles";
import {fetchDataFromAPI} from '../helpers/helpers';

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
            <Text style={styles.header}>Study Guides</Text>
            <ScrollView contentContainerStyle={styles.container}>
            
                    {data.map(item => (
                        <View key={item._id}>
                        <Text>{item.name}</Text>
                        <Text>{item.content.text}</Text>
                    </View>
                ))}
                
            </ScrollView>
        </View>
    );
};

export default ViewStudyGuidesView;
