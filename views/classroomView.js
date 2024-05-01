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
    const [quizzes, setQuizzes] = useState({});

    // informational text
    const [studentsErrorText, setStudentsErrorText] = useState('');
    const [studentsSuccessText, setStudentsSuccessText] = useState('');
    const [studyGuidesErrorText, setStudyGuidesErrorText] = useState('');
    const [studyGuidesSuccessText, setStudyGuidesSuccessText] = useState('');
    const [quizzesErrorText, setQuizzesErrorText] = useState('');
    const [quizzesSuccessText, setQuizzesSuccessText] = useState('');

    // activity indicator states
    const [isStudentsLoading, setIsStudentsLoading] = useState(true);
    const [isStudyGuidesLoading, setIsStudyGuidesLoading] = useState(true);
    const [isQuizzesLoading, setIsQuizzesLoading] = useState(true);

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

    useEffect(() => {
        if (Object.keys(classroom).length !== 0) {
            fetchAndSetQuizzes();
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
                    console.log(response.body);
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

    const fetchAndSetQuizzes = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/artifacts/quizzes/${classroom.id}`, authContext);
            switch (response.status) {
                case 204:
                    setQuizzesErrorText('');
                    setQuizzesSuccessText('The classroom has no quizzes.');
                    return;
                case 200:
                    setQuizzesErrorText('');
                    setQuizzesSuccessText('');
                    console.log(response.body);
                    setQuizzes(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of quizzes");
            }
        } catch (error) {
            console.error(`Error getting classroom's quizzes:`, error.message);
            setQuizzesSuccessText('');
            setQuizzesErrorText(`Unable to access quizzes.`);
        } finally {
            setIsQuizzesLoading(false);
        }
    };


    return(
        <View style={styles.container}>
            {isStudentsLoading || isStudyGuidesLoading || isQuizzesLoading ?
                <Text></Text> :
                <Text style={styles.header}>{classroom.name}</Text>
            }
            {isStudentsLoading || isStudyGuidesLoading || isQuizzesLoading ?
                <ActivityIndicator size="large" color="#0000ff" /> : (
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
                        <Text style={styles.header}>Study Guides</Text>
                        {Object.values(studyGuides).map(artifact => (
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
                        {studyGuidesErrorText !== '' && (
                            <Text style={styles.errorText}>{studyGuidesErrorText}</Text>
                        )}
                        {studyGuidesSuccessText !== '' && (
                            <Text style={styles.successText}>{studyGuidesSuccessText}</Text>
                        )}
                        <Text style={styles.header}>Quizzes</Text>
                        {Object.values(quizzes).map(artifact => (
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
                        {quizzesErrorText !== '' && (
                            <Text style={styles.errorText}>{quizzesErrorText}</Text>
                        )}
                        {quizzesSuccessText !== '' && (
                            <Text style={styles.successText}>{quizzesSuccessText}</Text>
                        )}
                    </ScrollView>
                )
            }
        </View>
    );
};

export default ClassroomView;

