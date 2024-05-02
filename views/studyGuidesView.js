import { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const StudyGuidesView = () => {
  const authContext = useAuth();
    const { authData } = authContext;
    const navigation = useNavigation();

    const [studyGuides, setStudyGuides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // informational text
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    useEffect(() => {
        fetchAndSetStudyGuides();
    }, []);

    const fetchAndSetStudyGuides = async () => {
        try {
            const response = await fetchDataFromAPI(`artifacts/study-guides/${authData.uid}`, authContext);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    setSuccessText('You have no study guides.');
                    return;
                case 200:
                    setErrorText('');
                    console.log(response.body);
                    setStudyGuides(response.body);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of study guides.");

            }
        } catch (error) {
            console.error(`Error getting study guides:`, error.message);
            setErrorText(`Unable to access study guides.`);
        } finally {
            setIsLoading(false);
        }
    };
  
    return (
      <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Study Guides</Text>
        {isLoading ?
                <ActivityIndicator
                    size="large"
                    color="#0000ff"/> :
                studyGuides.length > 0 ? (
                    <ScrollView>
                        {Object.values(studyGuides).map(studyGuide => (
                            <TouchableOpacity
                                key={studyGuide.id}
                                style={styles.button}
                                onPress={() => navigation.navigate('Study Guide', { artifact: studyGuide })}>
                                <Text style={styles.buttonText}>
                                    {studyGuide.code}
                                    {"\n"}
                                    {studyGuide.course}
                                    {"\n"}
                                    {studyGuide.name}
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
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Create Study Guide')}
        >
          <Text style={styles.buttonText}>Create New Study Guide</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  };

  export default StudyGuidesView;
