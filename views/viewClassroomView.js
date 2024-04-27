import { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";

const ViewClassroomView = ({ route }) => {
    const { authData } = useAuth();

    const [classroom, setClassroom] = useState({});
    const [students, setStudents]= useState({});
    const [artifacts, setArtifacts] = useState({});

    // informational text
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    useEffect(() => {
        setClassroom(route.params.classroom);
    }, [route.params.classroom]);

    useEffect(() => {
        if (Object.keys(classroom).length !== 0) {
            fetchAndSetStudents();
        }
    }, [classroom]);

    const fetchAndSetStudents = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/students/${classroom.id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('The classroom has no students.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setStudents(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of students");
            }
        } catch (error) {
            console.error(`Error getting classroom's students:`, error.message);
            setErrorText(`Unable to access students.`);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>{classroom.name}</Text>
            <View>
                <Text style={styles.header}>Students</Text>
                {Object.values(students).map(student => (
                    <Text
                        key={student.uid}
                        style={styles.button}>
                        {student.username}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default ViewClassroomView;

