import { useNavigation } from "@react-navigation/native";
import { fetchDataFromAPI, sendDataToAPI } from "../helpers/helpers";
import { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, CheckBox, ScrollView, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/authContext';
import styles from "../styles/styles";

const CreateArtifactView = () => {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [artifactName, setArtifactName] = useState('');
    const [errorText, setErrorText] = useState('');
    const { authData } = useAuth();
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);
    const [isActiveClassrooms, setIsActiveClassrooms] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getDepartments();
    }, []);

    useEffect(() => {
        getTypes();
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

    const getTypes = async () => {
        try {
            const response = await fetchDataFromAPI("artifacts/types", authData.token);
            switch (response.status) {
                case 204:
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setTypes(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of types");
            }
        } catch (error) {
            console.error(`Error getting types:`, error.message);
        }
    }

    const getCourses = async (id) => {
        try {
            setIsLoadingCourses(true);
            setIsLoadingTemplates(true);
            setCourse('');
            setType('');
            setTemplate('');
            setArtifactName('');
            setIsActiveClassrooms(false);
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

    const getTemplates = async (id) => {
        try {
            setArtifactName('');
            setType('');
            setIsLoadingTemplates(true);
            setIsFormComplete(false);
            if (id.length === 0) {
                setTemplate('');
                setErrorText('');
                setIsActiveClassrooms(false);
                return;
            }
            const response = await fetchDataFromAPI(`artifacts/templates/courses/${id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No templates available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
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

    const getTemplatesByType = async (id) => {
        try {
            setArtifactName('');
            setIsLoadingTemplates(true);
            setIsFormComplete(false);

            console.log(id);

            const type = Number(id) === 1 ? 'study-guides' : 'quizzes';
            const response = await fetchDataFromAPI(`artifacts/templates/courses/${type}/${course}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No templates available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
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
            const response = await fetchDataFromAPI(`classrooms/instructors/${authData.uid}/${courseID}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No classrooms available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
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

    const handleArtifactCreation = async () => {
        try {
            setIsPosting(true);
            const response = await sendDataToAPI('artifacts', 'POST', {
                "uid": authData.uid,
                "template_id": template,
                "name": artifactName,
                "classrooms": selectedClassrooms
            }, authData.token);
            switch (response.status) {
                case 400:
                    setErrorText("Missing data required for artifact creation.");
                    return;
                case 201:
                    setErrorText('');
                    console.log(response.body);
                    navigation.navigate("Artifacts");
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
            <Text style={styles.header}>Create Artifact</Text>
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
                setCourse(itemValue);
                itemIndex === 0 ? setCourseCode('') : setCourseCode(courses[itemIndex-1].code);
                getTemplates(itemValue);
                if(authData.account_type === 1) getClassrooms(itemValue);
            }} enabled={!isLoadingCourses}>
                <Picker.Item label="Select Course" value=""/>
                {courses.map((course, index) => (
                    <Picker.Item label={`${course.code} - ${course.name}`} value={course.id} key={index}/>
                ))}
            </Picker>
            <Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => {
                setType(itemValue);
                itemValue.length === 0 ? getTemplates(course) : getTemplatesByType(itemValue);
            }} enabled={!isLoadingTemplates}>
                <Picker.Item label="Select Template Type" value=""/>
                {types.map((type, index) => (
                    <Picker.Item label={type.name} value={type.id} key={index}/>
                ))}
            </Picker>
            <Picker selectedValue={template} onValueChange={(itemValue, itemIndex) => {
                setTemplate(itemValue);
                if (itemValue.length === 0) {
                    setArtifactName('');
                    setIsFormComplete(false);
                } else {
                    const template = templates[itemIndex-1];
                    const autoName = `${courseCode} - ${template.name}`
                    setArtifactName(autoName);
                    setIsFormComplete(true)
                }
            }} enabled={!isLoadingTemplates}>
                <Picker.Item label="Select Template" value=""/>
                {templates.map((template, index) => (
                    <Picker.Item label={template.name} value={template.id} key={index}/>
                ))}
            </Picker>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setArtifactName(text);
                    setIsFormComplete(text.trim().length > 0);
                }}
                value={artifactName}
                placeholder="Name"
                editable={template.length > 0}
            />
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={isLoadingClassrooms}/>
            {isActiveClassrooms && (
                <ScrollView>
                {classrooms.map(classroom => (
                    <View key={classroom.id} style={styles.checkboxContainer}>
                        <CheckBox
                            value={selectedClassrooms.includes(classroom.id)}
                            onValueChange={() => toggleClassroomSelection(classroom.id)}
                        />
                        <Text>{classroom.name}</Text>
                    </View>
                ))}
                </ScrollView>
            )}
            <TouchableOpacity
                style={isFormComplete ? styles.button : styles.disabledButton}
                onPress={isFormComplete ? handleArtifactCreation : null}>
                <Text style={styles.buttonText}>Create Artifact</Text>
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

export default CreateArtifactView;