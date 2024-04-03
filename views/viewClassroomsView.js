import React, { useState, useEffect } from 'react';
import {Text, View} from "react-native";
import styles from "./styles";
import fetchDataFromAPI from '../helpers/helpers';

const ViewClassroomsView = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const students = await fetchDataFromAPI('classrooms/6');
            let newData = {};
            for (let student of students) {
                if (newData[student.classroom_id] === undefined){
                    newData[student.classroom_id] = {};
                    newData[student.classroom_id]['name'] = student.classroom_name;
                    newData[student.classroom_id]['students'] = [];
                }
                newData[student.classroom_id]['students'].push(student.email);
            }
            setData(newData);
        };
        fetchAndSetData();
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Instructed Classrooms</Text>
            <div>
                {Object.values(data).map(item => (
                    <div key={item.name}>
                        <h1>{item.name}</h1>
                        <ul>
                            {item.students.map(student => (
                                <li key={student}>{student}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </View>
    );
};

export default ViewClassroomsView;

