import { useState, useEffect } from 'react';
import {ScrollView, Text, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";

const ArtifactView = ({ route }) => {
    const { authData } = useAuth();

    const [artifactOverview, setArtifactOverview] = useState({});
    const [quiz, setQuiz] = useState({});

    // informational text
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        setArtifactOverview(route.params.artifact)
    }, [route.params.artifact]);

    useEffect(() => {
        fetchAndSetArtifact();
    }, [artifactOverview]);

    const fetchAndSetArtifact = async () => {
        try {
            console.log(artifactOverview);
            const response = await fetchDataFromAPI(`artifacts/${artifactOverview.id}`, authData.token);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setQuiz(response.body.content.problems);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of artifact");
            }
        } catch (error) {
            console.error(`Error getting artifact:`, error.message);
            setErrorText(`Unable to access artifact.`);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>{artifactOverview.name}</Text>
            <ScrollView>
                {Object.values(quiz).map(((questions, index) => (
                    <View>
                        <Text style={styles.header}>Question {index+1}</Text>
                        <Text
                            key={index}
                            style={styles.buttonText}>
                            {questions.problem}
                        </Text>
                    </View>
                )))}
            </ScrollView>
            {errorText !== '' && (
                <Text style={styles.errorText}>{errorText}</Text>
            )}
        </View>
    );
};

export default ArtifactView;
