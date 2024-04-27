import { useNavigation } from "@react-navigation/native";
import { fetchDataFromAPI, sendDataToAPI } from "../helpers/helpers";
import { useEffect, useState } from "react";
import { View, Text, Picker, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/authContext';
import styles from "./styles";

const CreateArtifactView = () => {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [artifactName, setArtifactName] = useState();
    const [errorText, setErrorText] = useState();
    const [authData] = useAuth();
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
    const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(true);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getDepartments();
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
            console.error(`Error getting departnents:`, error.message);
            setErrorText(`Unable to access departments.`);
        } finally {
            setIsLoadingDepartments(false);
        }
    }

    const getCourses = async (id) => {
        try {
            const response = await fetchDataFromAPI(`artifacts/departments/courses/${id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No courses available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setCourses(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of courses");
            }
        } catch (error) {
            console.error(`Error getting courses:`, error.message);
            setErrorText(`Unable to access courses.`);
        } finally {
            setIsLoadingCourses(false);
        }
    }

    const getTemplates = async (id) => {
        try {
            const response = await fetchDataFromAPI(`artifacts/templates/courses/${id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No templates available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setTemplates(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of templates");
            }
        } catch (error) {
            console.error(`Error getting templates:`, error.message);
            setErrorText(`Unable to access templates.`);
        } finally {
            setIsLoadingTemplates(false);
        }
    }

    const getClassrooms = async(courseID) => {
        try {
            const response = await fetchDataFromAPI(`classrooms/instructors/${authData.uid}/${courseID}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('No classrooms available.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setClassrooms(response.body);
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
            const response = await sendDataToAPI('artifacts', 'POST', {
                "uid": authData.uid,
                "template_id": template,
                "name": artifactName,
                "classrooms": classrooms
            });
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
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Create Artifact</Text>
            {errorText !== '' && (
                <Text style={styles.errorText}>
                    {errorText}
                </Text>
            )}
            <Picker selectedValue={department} onValueChange={(itemValue, itemIndex) => {
                setDepartment(itemValue);
                getCourses(itemIndex);
            }} enabled={!isLoadingDepartments}>
                <Picker.Item label="Select Department" value=""/>
                {departments.map(department => (
                    <Picker.Item label={department.name} value={department.id} key={department.id}/>
                ))}
            </Picker>
            <Picker selectedValue={course} onValueChange={(itemValue, itemIndex) => {
                setCourse(itemValue);
                getTemplates(itemIndex);
            }} enabled={!isLoadingCourses}>
                <Picker.Item label="Select Course" value=""/>
                {courses.map(course => (
                    <Picker.Item label={course.code} value={course.id} key={course.id}/>
                ))}
            </Picker>
            <Picker selectedValue={template} onValueChange={(itemValue, itemIndex) => {
                setTemplate(itemValue);
                if(authData.account === 1) getClassrooms(itemIndex);
            }} enabled={!isLoadingTemplates}>
                <Picker.Item label="Select Template" value=""/>
                {templates.map(template => (
                    <Picker.Item label={template.name} value={template.id} key={template.id}/>
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
            />
            {isLoadingClassrooms ? (
                <Text></Text>
            ) : (
                classrooms.map(classroom => (
                    <View key={classroom.id} style={styles.checkboxContainer}>
                        <CheckBox
                            value={selectedClassrooms.includes(classroom.id)}
                            onValueChange={() => toggleClassroomSelection(classroom.id)}
                        />
                        <Text>{classroom.name}</Text>
                    </View>
                ))
            )}
            <TouchableOpacity style={styles.button} enabled={isFormComplete} onPress={() => {
                handleArtifactCreation();
            }}>
                <Text style={styles.buttonText}>Create Artifact</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateArtifactView;