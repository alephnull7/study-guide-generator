import { useState, useEffect } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";

const ClassroomView = ({ route }) => {
    const { authData } = useAuth();
    const navigation = useNavigation();

    const [classroom, setClassroom] = useState({});
    const [students, setStudents]= useState({});
    const [artifacts, setArtifacts] = useState({});

    // informational text
    const [studentsErrorText, setStudentsErrorText] = useState('');
    const [studentsSuccessText, setStudentsSuccessText] = useState('');
    const [artifactsErrorText, setArtifactsErrorText] = useState('');
    const [artifactsSuccessText, setArtifactsSuccessText] = useState('');

    useEffect(() => {
        setClassroom(route.params.classroom);
    }, [route.params.classroom]);

    useEffect(() => {
        if (Object.keys(classroom).length !== 0) {
            fetchAndSetStudents();
        }
    }, [classroom]);

    useEffect(() => {
        if (Object.keys(classroom).length !== 0) {
            fetchAndSetArtifacts();
        }
    }, [classroom]);

    const fetchAndSetStudents = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/students/${classroom.id}`, authData.token);
            switch (response.status) {
                case 204:
                    setStudentsErrorText('');
                    setStudentsSuccessText('The classroom has no students.');
                    return;
                case 200:
                    setStudentsErrorText('');
                    setStudentsSuccessText('');
                    console.log(response.body);
                    setStudents(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of students");
            }
        } catch (error) {
            console.error(`Error getting classroom's students:`, error.message);
            setStudentsSuccessText('');
            setStudentsErrorText(`Unable to access students.`);
        }
    };

    const fetchAndSetArtifacts = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/artifacts/${classroom.id}`, authData.token);
            switch (response.status) {
                case 204:
                    setArtifactsErrorText('');
                    setArtifactsSuccessText('The classroom has no artifacts.');
                    return;
                case 200:
                    setArtifactsErrorText('');
                    setArtifactsSuccessText('');
                    console.log(response.body);
                    setArtifacts(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of artifacts");
            }
        } catch (error) {
            console.error(`Error getting classroom's artifacts:`, error.message);
            setArtifactsSuccessText('');
            setArtifactsErrorText(`Unable to access artifacts.`);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>{classroom.name}</Text>
            <ScrollView>
                <Text style={styles.header}>Students</Text>
                    {Object.values(students).map(student => (
                        <Text
                            key={student.uid}
                            style={styles.button}>
                            {student.username}
                        </Text>
                    ))}
                {studentsErrorText !== '' && (
                    <Text style={styles.errorText}>{studentsErrorText}</Text>
                )}
                {studentsSuccessText !== '' && (
                    <Text style={styles.successText}>{studentsSuccessText}</Text>
                )}
                <Text style={styles.header}>Artifacts</Text>
                    {Object.values(artifacts).map(artifact => (
                        <TouchableOpacity
                            key={artifact.id}
                            style={styles.button}
                            onPress={() => navigation.navigate('Artifact', { artifact: artifact })}>
                            <Text style={styles.buttonText}>
                                {artifact.name}
                                {"\n"}
                                {artifact.code}
                                {"\n"}
                                {artifact.course}
                            </Text>
                        </TouchableOpacity>
                    ))}
                {artifactsErrorText !== '' && (
                    <Text style={styles.errorText}>{artifactsErrorText}</Text>
                )}
                {artifactsSuccessText !== '' && (
                    <Text style={styles.successText}>{artifactsSuccessText}</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ClassroomView;

