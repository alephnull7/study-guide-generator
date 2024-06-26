/*
    Author: Xander Renkema, Gregory Smith
    Date: May 6, 2024
*/

import { useState, useEffect } from 'react';
import {ActivityIndicator, Modal, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import {fetchAndSavePDFFromAPI, fetchDataFromAPI, sendDataToAPI} from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

const StudyGuideView = ({ route }) => {
    const navigation = useNavigation();
    const authContext = useAuth();
    const { authData } = authContext;

    const [artifactId, setArtifactId] = useState();
    const [artifactName, setArtifactName] = useState('');
    const [artifactContent, setArtifactContent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // informational text
    const [errorText, setErrorText] = useState('');
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [expandedQuestions, setExpandedQuestions] = useState({});

    useEffect(() => {
        navigation.setOptions({ title: `${authData.username}'s Study Guide`});
      }, []);

    useEffect(() => {
        setArtifactName(route.params.artifact.name);
        fetchAndSetArtifact(route.params.artifact)
    }, [route.params.artifact]);

    const fetchAndSetArtifact = async (artifactOverview) => {
        try {
            const response = await fetchDataFromAPI(`artifacts/${artifactOverview.id}`, authContext);
            switch (response.status) {
                case 204:
                    setErrorText('');
                    return;
                case 200:
                    setErrorText('');
                    setArtifactId(response.body._id);
                    setArtifactContent(response.body.content);
                    return;
                default:
                    throw new Error("Unsuccessful retrieval of study guide");
            }
        } catch (error) {
            console.error(`Error getting study guide:`, error.message);
            setErrorText(`Unable to access study guide.`);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleQuestionVisibility = (index) => {
    setExpandedQuestions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
    };

    const saveStudyGuidePDF = async() => {
        try {
            setIsProcessing(true);
            const response = await fetchAndSavePDFFromAPI(`artifacts/pdf/${artifactId}`, authContext, artifactName);
            if (response.status === 500) {
                throw new Error("Unsuccessful export of study guide");
            }
            setErrorText('');
        } catch (error) {
            console.error('Error exporting study guide:', error.message);
            setErrorText('Unable to save study guide.');
        } finally {
            setIsProcessing(false);
        }
    }

    const handleDeletion = async () => {
        try {
            setDeleteVisible(!deleteVisible);
            setIsProcessing(true);
            const response = await sendDataToAPI(`artifacts/${artifactId}`, 'DELETE', {}, authContext);
            if (response.status !== 200) {
                throw new Error("Unsuccessful deletion");
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting artifact:', error.message);
            setErrorText('Unable to delete account.');
        } finally {
            setIsProcessing(false);
        }
    }

    const DeleteArtifactModal = ({ visible, onClose, onSubmit }) => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>
                            Confirm Deletion
                        </Text>
                        <Text style={styles.modalText}>
                            Are you sure you would like to delete your this study guide?
                            {"\n"}
                            This action is irreversible.
                        </Text>
                        <View style={styles.buttonGroup}>
                            <Pressable
                                style={[styles.redButton, styles.buttonClose, styles.buttonContainer]}
                                onPress={onSubmit}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.buttonContainer]}
                                onPress={onClose}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return(
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Review your study guide in preparation for a quiz or exam. You can also save it as a PDF or delete it.
            </Text>
        <View style={styles.formContainer}>
            {isLoading ?
                <Text></Text> :
                <Text style={styles.header}>{artifactName}</Text>
            }
            {isLoading ?
                <ActivityIndicator
                    size="large"
                    color="#0000ff"/> :
                Object.keys(artifactContent).length > 0 ? (
                    <ScrollView>
                        {artifactContent.problems.map((problem, index) => (
                            <View key={index}>
                                <TouchableOpacity onPress={() => toggleQuestionVisibility(index)}>
                                    <Text style={styles.header2}>
                                        Question {index + 1}: {problem.question}
                                    </Text>
                                </TouchableOpacity>
                                {expandedQuestions[index] && (
                                    <Text style={styles.body}>{'A: ' + problem.answer}</Text>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                ) : <Text></Text>
            }
            {isLoading ?
                <Text></Text> : (
                <View>
                    <TouchableOpacity
                        style={!isProcessing ? styles.button : styles.disabledButton}
                        onPress={isProcessing ? null : saveStudyGuidePDF}>
                        <Text style={styles.buttonText}>Save as PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={!isProcessing ? styles.redButton : styles.disabledButton}
                        onPress={() => isProcessing ? null : setDeleteVisible(true)}>
                        <Text style={styles.buttonText}>Delete Study Guide</Text>
                    </TouchableOpacity>
                    {errorText !== '' && (
                        <Text style={styles.errorText}>{errorText}</Text>
                    )}
                </View>
                )
            }
            <DeleteArtifactModal
                visible={deleteVisible}
                onClose={() => setDeleteVisible(false)}
                onSubmit={handleDeletion}
            />
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={isProcessing}/>
        </View>
        </View>
    );
};

export default StudyGuideView;
