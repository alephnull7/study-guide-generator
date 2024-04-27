import { useNavigation } from "@react-navigation/native";
import { fetchDataFromAPI, sendDataToAPI } from "../helpers/helpers";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, CheckBox, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/authContext';
import styles from "../styles/styles";

const CreateClassroomView = () => {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [classroomName, setClassroomName] = useState('');
    const [errorText, setErrorText] = useState('');
    const { authData } = useAuth();
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getDepartments();
    }, []);

    useEffect(() => {
        getStudents();
    }, []);

    const getDepartments = async () => {
        try {
            const response = await fetchDataFromAPI("artifacts/departments", authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No departments available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setDepartments(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of departments");
            }
        } catch (error) {
            console.error(`Error getting departments:`, error.message);
            setErrorText(`Unable to access departments.`);
        } finally {
            setIsLoadingDepartments(false);
        }
    }

    const getCourses = async (id) => {
        try {
            setIsLoadingCourses(true);
            setCourse('');
            setClassroomName('');
            setIsFormComplete(false);
            if (id.length === 0) {
                setCourse('');
                return;
            }
            const response = await fetchDataFromAPI(`artifacts/departments/courses/${id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No courses available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setCourses(response.body);
                    setIsLoadingCourses(false);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of courses");
            }
        } catch (error) {
            console.error(`Error getting courses:`, error.message);
            setErrorText(`Unable to access courses.`);
        }
    }

    const getStudents = async() => {
        try {
            const response = await fetchDataFromAPI(`users/students`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No students available.');
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
            console.error(`Error getting students:`, error.message);
            setErrorText(`Unable to access students.`);
        }
    }

    const toggleStudentSelection = (studentID) => {
        setSelectedStudents(prevSelected => {
            if (prevSelected.includes(studentID)) {
                return prevSelected.filter(uid => uid !== studentID); // Deselect classroom if already selected
            } else {
                return [...prevSelected, studentID]; // Select classroom if not already selected
            }
        });
    }

    const handleClassroomCreation = async () => {
        try {
            setIsPosting(true);
            const response = await sendDataToAPI('classrooms', 'POST', {
                "uid": authData.uid,
                "name": classroomName,
                "course_id": course,
                "students": selectedStudents
            }, authData.token);
            switch (response.status) {
                case 400:
                    setErrorText("Missing data required for classroom creation.");
                    return;
                case 201:
                    setErrorText('');
                    console.log(response.body);
                    navigation.navigate("Classrooms");
                    return;
                default:
                    throw new Error("Unsuccessful artifact creation");
            }
        } catch(error) {
            console.error('Error creating artifact: ', error.message);
            setErrorText('Unable to create artifact.');
        } finally {
            setIsPosting(false);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Create Classroom</Text>
            <Picker selectedValue={department} onValueChange={(itemValue, itemIndex) => {
                setDepartment(itemValue);
                getCourses(itemValue);
            }} enabled={!isLoadingDepartments}>
                <Picker.Item label="Select Department" value=""/>
                {departments.map(department => (
                    <Picker.Item label={department.name} value={department.id} key={department.id}/>
                ))}
            </Picker>
            <Picker selectedValue={course} onValueChange={(itemValue, itemIndex) => {
                setClassroomName('');
                setCourse(itemValue);
                setIsFormComplete(false);
            }} enabled={!isLoadingCourses}>
                <Picker.Item label="Select Course" value=""/>
                {courses.map(course => (
                    <Picker.Item label={course.code} value={course.id} key={course.id}/>
                ))}
            </Picker>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setClassroomName(text);
                    setIsFormComplete(text.trim().length > 0);
                }}
                value={classroomName}
                placeholder="Name"
                editable={course.length > 0}
            />
            {students.length === 0 ?
                <ActivityIndicator size="large" color="#0000ff" /> : (
                <ScrollView>
                    {Object.values(students).map(student => (
                        <View key={student.uid} style={styles.checkboxContainer}>
                            <CheckBox
                                value={selectedStudents.includes(student.uid)}
                                onValueChange={() => toggleStudentSelection(student.uid)}
                            />
                            <Text>{student.username}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
            <TouchableOpacity
                style={isFormComplete ? styles.button : styles.disabledButton}
                onPress={isFormComplete ? handleClassroomCreation : null}>
                <Text style={styles.buttonText}>Create Classroom</Text>
            </TouchableOpacity>
            {errorText !== '' && (
                <Text style={styles.errorText}>
                    {errorText}
                </Text>
            )}
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={isPosting}/>
        </View>
    )
}

export default CreateClassroomView;
