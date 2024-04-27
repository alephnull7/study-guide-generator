import { useState, useEffect } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const ClassroomsView = () => {
    const { authData } = useAuth();
    const navigation = useNavigation();

    const [quizzes, setQuizzes] = useState([]);

    // informational text
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    useEffect(() => {
        fetchAndSetQuizzes();
    }, []);

    const fetchAndSetQuizzes = async () => {
        try {
            const response = await fetchDataFromAPI(`artifacts/quizzes/${authData.uid}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('You have no study guides.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setQuizzes(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of study guides.");

            }
        } catch (error) {
            console.error(`Error getting study guides:`, error.message);
            setErrorText(`Unable to access study guides.`);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Quizzes</Text>
            <ScrollView>
                {Object.values(quizzes).map(quiz => (
                    <TouchableOpacity
                        key={quiz.id}
                        style={styles.button}
                        onPress={() => navigation.navigate('Artifact', { artifact: artifact })}>
                        <Text style={styles.buttonText}>
                            {quiz.code}
                            {"\n"}
                            {quiz.course}
                            {"\n"}
                            {quiz.name}
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

export default ClassroomsView;
