import { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const QuizzesView = () => {
    const authContext = useAuth();
    const { authData } = authContext;
    const navigation = useNavigation();

    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // informational text
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    useEffect(() => {
        fetchAndSetQuizzes();
    }, []);

    const fetchAndSetQuizzes = async () => {
        try {
            const response = await fetchDataFromAPI(`artifacts/quizzes/${authData.uid}`, authContext);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('You have no quizzes.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setQuizzes(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of quizzes.");

            }
        } catch (error) {
            console.error(`Error getting study guides:`, error.message);
            setErrorText(`Unable to access quizzes.`);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.header}>Quizzes</Text>
            {isLoading ?
                <ActivityIndicator
                    size="large"
                    color="#0000ff"/> :
                quizzes.length > 0 ? (
                <ScrollView>
                    {Object.values(quizzes).map(quiz => (
                        <TouchableOpacity
                            key={quiz.id}
                            style={styles.button}
                            onPress={() => navigation.navigate('Artifact', { artifact: quiz })}>
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
                ) : (
                <View>
                {errorText !== '' && (
                    <Text style={styles.errorText}>{errorText}</Text>
                )}
                {successText !== '' && (
                    <Text style={styles.successText}>{successText}</Text>
                )}
                </View>
                )
            }
        </View>
        </View>
    );
};

export default QuizzesView;
