import { useState, useEffect } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";

const ViewClassroomView = ({ route }) => {
    const { authData } = useAuth();
    const navigation = useNavigation();

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

    const fetchAndSetArtifacts = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/artifacts/${classroom.id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('The classroom has no artifacts.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setArtifacts(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of artifacts");
            }
        } catch (error) {
            console.error(`Error getting classroom's artifacts:`, error.message);
            setErrorText(`Unable to access artifacts.`);
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
            </ScrollView>
            {errorText !== '' && (
                <Text style={styles.errorText}>{errorText}</Text>
            )}
            {successText !== '' && (
                <Text style={styles.successText}>{successText}</Text>
            )}
        </View>
    );
};

export default ViewClassroomView;

