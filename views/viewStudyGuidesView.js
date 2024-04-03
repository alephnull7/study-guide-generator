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
        };
        fetchAndSetData();
        console.log(data);
    }, []);

    return(
        <View style={styles.container}>
        <Text style={styles.header}>User's Study Guides</Text>
            <div>
                     {/* Render fetched data */}
                     {data.map(item => (
                         <div key={item._id}>
                             <p>{item.name}</p>
                             <p>{item.content.text}</p>
                         </div>
                     ))}
                 </div>
        </View>
    );
};

export default ViewStudyGuidesView;
