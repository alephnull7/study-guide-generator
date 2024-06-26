/*
    Author: Xander Renkema, Gregory Smith
    Date: May 6, 2024
*/

import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import {useAuth} from "../contexts/authContext";

const LandingView = () => {
    const authContext = useAuth();
    const navigation = useNavigation();
    const [connectionStatus, setConnectionStatus] = useState(null);

    const checkConnection = async () => {
        const data = await fetchDataFromAPI('artifacts/auth/login', authContext);
        if (!data) {
            return false;
        } else return data.length !== 0;
    }

    const fetchData = async () => {
      const isConnected = await checkConnection();
      setConnectionStatus(isConnected);
    };

    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph} testID={'header'}>
          Welcome to the Study Guide Generator! You can use this app to generate study guides to help you study for quizzes or exams you may have. We generate these study guides for you with the power of OpenAI. Log in or create a new account to get started.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          testID={'login-button'}
        >
          <Text style={styles.buttonText}>Login to Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Account')}
          testID={'create-button'}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
        {connectionStatus === null && (
            <Text style={[styles.paragraph, {textAlign: 'center'}]}>Checking connection...</Text>
        )}
        {connectionStatus === true && (
            <Text style={styles.paragraph}></Text>
        )}
        {connectionStatus === false && (
            <Text style={styles.errorText}>
                Connection failed. Please check your internet connection and try again.
            </Text>
        )}
      </View>
    );
  };

  export default LandingView;