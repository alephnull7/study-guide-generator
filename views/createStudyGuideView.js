import { useNavigation } from "@react-navigation/native";
import { fetchDataFromAPI, sendDataToAPI } from "../helpers/helpers";
import { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/authContext';
import styles from "../styles/styles";

const CreateStudyGuideView = () => {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [studyGuideName, setStudyGuideName] = useState('');
    const [errorText, setErrorText] = useState('');
    const authContext = useAuth();
    const { authData } = authContext;
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);
    const [isActiveClassrooms, setIsActiveClassrooms] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: 'Study Guide Generator - Create Study Guide'})
        getDepartments();
    }, []);

    const getDepartments = async () => {
        try {
            const response = await fetchDataFromAPI("artifacts/departments", authContext);
            switch (response.status) {
                case 204:
                    setErrorText('No departments available.');
                    return;
                case 200:
                    setErrorText('');
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
            setIsLoadingTemplates(true);
            setCourse('');
            setTemplate('');
            setStudyGuideName('');
            setIsActiveClassrooms(false);
            setIsFormComplete(false);
            if (id.length === 0) {
                setCourse('');
                return;
            }
            const response = await fetchDataFromAPI(`artifacts/departments/courses/${id}`, authContext);
            switch (response.status) {
                case 204:
                    setErrorText('No courses available.');
                    return;
                case 200:
                    setErrorText('');
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

    const getTemplates = async (id) => {
        try {
            setStudyGuideName('');
            setIsLoadingTemplates(true);
            setIsFormComplete(false);
            if (id.length === 0) {
                setTemplate('');
                setErrorText('');
                setIsActiveClassrooms(false);
                return;
            }
            const response = await fetchDataFromAPI(`artifacts/templates/courses/${id}`, authContext);
            switch (response.status) {
                case 204:
                    setErrorText('No templates available.');
                    return;
                case 200:
                    setErrorText('');
                    setTemplates(response.body);
                    setIsLoadingTemplates(false);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of templates");
            }
        } catch (error) {
            console.error(`Error getting templates:`, error.message);
            setErrorText(`Unable to access templates.`);
        }
    }

    const getClassrooms = async(courseID) => {
        try {
            if (courseID.length === 0) {
                setClassrooms([]);
                return;
            }
            setIsLoadingClassrooms(true);
            const response = await fetchDataFromAPI(`classrooms/instructors/${authData.uid}/${courseID}`, authContext);
            switch (response.status) {
                case 204:
                    setClassrooms([]);
                    setIsActiveClassrooms(false);
                    return;
                case 200:
                    setErrorText('');
                    setClassrooms(response.body);
                    setIsActiveClassrooms(true);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of classrooms");
            }
        } catch (error) {
            console.error(`Error getting classrooms:`, error.message);
            setErrorText(`Unable to access classrooms.`);
        } finally {
            setIsLoadingClassrooms(false);
        }
    }

    const toggleClassroomSelection = (classroomId) => {
        setSelectedClassrooms(prevSelected => {
            if (prevSelected.includes(classroomId)) {
                return prevSelected.filter(id => id !== classroomId); // Deselect classroom if already selected
            } else {
                return [...prevSelected, classroomId]; // Select classroom if not already selected
            }
        });
    }

    const handleStudyGuideCreation = async () => {
        try {
            setIsPosting(true);
            const response = await sendDataToAPI('artifacts', 'POST', {
                "uid": authData.uid,
                "template_id": template,
                "name": studyGuideName,
                "classrooms": selectedClassrooms
            }, authContext);
            switch (response.status) {
                case 400:
                    setErrorText("Missing data required for study guide creation.");
                    return;
                case 201:
                    setErrorText('');
                    navigation.navigate("Study Guides");
                    return;
                default:
                    throw new Error("Unsuccessful study guide creation");
            }
        } catch(error) {
            console.error('Error creating study guide: ', error.message);
            setErrorText('Unable to create study guide.');
        } finally {
            setIsPosting(false);
        }
    }

    return(
        <View style={styles.container}>
        <View style={styles.formContainer}>
        <ScrollView>
            <Picker selectedValue={department} onValueChange={(itemValue, itemIndex) => {
                setDepartment(itemValue);
                getCourses(itemValue);
            }} enabled={!isLoadingDepartments}
                style={styles.pickerItem}>
                <Picker.Item label="Select Department" value=""/>
                {departments.map(department => (
                    <Picker.Item label={department.name} value={department.id} key={department.id}/>
                ))}
            </Picker>
            <Picker selectedValue={course} onValueChange={(itemValue, itemIndex) => {
                setCourse(itemValue);
                itemIndex === 0 ? setCourseCode('') : setCourseCode(courses[itemIndex-1].code);
                getTemplates(itemValue);
                if(authData.account_type === 1) getClassrooms(itemValue);
            }} enabled={!isLoadingCourses}
                style={styles.pickerItem}>
                <Picker.Item label="Select Course" value=""/>
                {courses.map((course, index) => (
                    <Picker.Item label={`${course.code} - ${course.name}`} value={course.id} key={index}/>
                ))}
            </Picker>
            <Picker selectedValue={template} onValueChange={(itemValue, itemIndex) => {
                setTemplate(itemValue);
                if (itemValue.length === 0) {
                    setStudyGuideName('');
                    setIsFormComplete(false);
                } else {
                    const template = templates[itemIndex-1];
                    const autoName = `${courseCode} - ${template.name}`
                    setStudyGuideName(autoName);
                    setIsFormComplete(true);
                }
            }} enabled={!isLoadingTemplates}
                style={styles.pickerItem}>
                <Picker.Item label="Select Template" value=""/>
                {templates.map((template, index) => (
                    <Picker.Item label={template.name} value={template.id} key={index}/>
                ))}
            </Picker>
            <TextInput
                style={isFormComplete ? styles.input : styles.disabledInput}
                onChangeText={(text) => {
                    setStudyGuideName(text);
                    setIsFormComplete(text.trim().length > 0);
                }}
                value={studyGuideName}
                placeholder="Name"
                editable={isFormComplete}
            />
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={isLoadingClassrooms}/>
            {isActiveClassrooms && (
                <View>
                {classrooms.map(classroom => (
                    <View key={classroom.id} style={styles.checkboxContainer}>
                        <BouncyCheckbox 
                            onPress={() => toggleClassroomSelection(classroom.id)} 
                            fillColor="orange"
                            unFillColor="lightgray"/>
                        <Text>{classroom.name}</Text>
                    </View>
                ))}
                </View>
            )}
            <TouchableOpacity
                style={isFormComplete ? styles.button : styles.disabledButton}
                onPress={isFormComplete ? handleStudyGuideCreation : null}>
                <Text style={styles.buttonText}>Create Study Guide</Text>
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
                
                </ScrollView>
        </View>
        </View>
    )
}

export default CreateStudyGuideView;
