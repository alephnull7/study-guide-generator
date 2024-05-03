import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";

const ClassroomView = ({ route }) => {
    const authContext = useAuth();
    const navigation = useNavigation();

    const [classroom, setClassroom] = useState({});
    const [students, setStudents]= useState({});
    const [studyGuides, setStudyGuides] = useState({});

    // informational text
    const [studentsErrorText, setStudentsErrorText] = useState('');
    const [studentsSuccessText, setStudentsSuccessText] = useState('');
    const [studyGuidesErrorText, setStudyGuidesErrorText] = useState('');
    const [studyGuidesSuccessText, setStudyGuidesSuccessText] = useState('');

    // activity indicator states
    const [isStudentsLoading, setIsStudentsLoading] = useState(true);
    const [isStudyGuidesLoading, setIsStudyGuidesLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({ title: `Classroom`});
      }, []);

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
            fetchAndSetStudyGuides();
        }
    }, [classroom]);

    const fetchAndSetStudents = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/students/${classroom.id}`, authContext);
            switch (response.status) {
                case 204:
                    setStudentsErrorText('');
                    setStudentsSuccessText('The classroom has no students.');
                    return;
                case 200:
                    setStudentsErrorText('');
                    setStudentsSuccessText('');
                    setStudents(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of students");
            }
        } catch (error) {
            console.error(`Error getting classroom's students:`, error.message);
            setStudentsSuccessText('');
            setStudentsErrorText(`Unable to access students.`);
        } finally {
            setIsStudentsLoading(false);
        }
    };

    const fetchAndSetStudyGuides = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/artifacts/study-guides/${classroom.id}`, authContext);
            switch (response.status) {
                case 204:
                    setStudyGuidesErrorText('');
                    setStudyGuidesSuccessText('The classroom has no study guides.');
                    return;
                case 200:
                    setStudyGuidesErrorText('');
                    setStudyGuidesSuccessText('');
                    setStudyGuides(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of study guides");
            }
        } catch (error) {
            console.error(`Error getting classroom's study guides:`, error.message);
            setStudyGuidesSuccessText('');
            setStudyGuidesErrorText(`Unable to access study guides.`);
        } finally {
            setIsStudyGuidesLoading(false);
        }
    };

    return(
        <View style={styles.container}>
        <View style={styles.formContainer}>
            {isStudentsLoading || isStudyGuidesLoading ?
                <Text></Text> :
                <Text style={styles.header}>{classroom.name}</Text>
            }
            {isStudentsLoading || isStudyGuidesLoading ?
                <ActivityIndicator size="large" color="#0000ff" /> : (
                    <ScrollView>
                        <Text style={styles.header2}>Students</Text>
                        {Object.values(students).map(student => (
                            <Text
                                key={student.uid}
                                style={styles.body}>
                                {student.username}
                            </Text>
                        ))}
                        {studentsErrorText !== '' && (
                            <Text style={styles.errorText}>{studentsErrorText}</Text>
                        )}
                        {studentsSuccessText !== '' && (
                            <Text style={styles.successText}>{studentsSuccessText}</Text>
                        )}
                        <Text style={styles.header2}>Study Guides</Text>
                        {Object.values(studyGuides).map(artifact => (
                            <TouchableOpacity
                                key={artifact.id}
                                style={styles.button}
                                onPress={() => navigation.navigate('Study Guide', { artifact: artifact })}>
                                <Text style={styles.buttonText}>
                                    {artifact.name}
                                    {"\n"}
                                    {artifact.code}
                                    {"\n"}
                                    {artifact.course}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        {studyGuidesErrorText !== '' && (
                            <Text style={styles.errorText}>{studyGuidesErrorText}</Text>
                        )}
                        {studyGuidesSuccessText !== '' && (
                            <Text style={styles.successText}>{studyGuidesSuccessText}</Text>
                        )}
                    </ScrollView>
                )
            }
        </View>
        </View>
    );
};

export default ClassroomView;

