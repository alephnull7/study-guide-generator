import { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const ClassroomsView = () => {
    const { authData } = useAuth();
    const navigation = useNavigation();

    const [classrooms, setClassrooms] = useState([]);

    // informational text
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    useEffect(() => {
        fetchAndSetClassrooms();
    }, []);

    const fetchAndSetClassrooms = async () => {
        try {
            const response = await fetchDataFromAPI(`classrooms/${authData.uid}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('You have no classrooms.');
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
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Instructed Classrooms</Text>
            {Object.values(classrooms).map(classroom => (
                <TouchableOpacity
                    key={classroom.id}
                    style={styles.button}
                    onPress={() => navigation.navigate('View Classroom', { classroom: classroom })}>
                    <Text style={styles.buttonText}>
                        {classroom.name}
                        {"\n"}
                        {classroom.code}
                        {"\n"}
                        {classroom.course}
                    </Text>
                </TouchableOpacity>
            ))}
            {errorText !== '' && (
                <Text style={styles.errorText}>{errorText}</Text>
            )}
            {successText !== '' && (
                <Text style={styles.successText}>{successText}</Text>
            )}
        </View>
    );
};

export default ClassroomsView;
