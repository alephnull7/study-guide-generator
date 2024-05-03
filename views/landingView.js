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
        if(data.length === 0 || !data) {
            console.error("Connection failed");
            return false;
        } else {
            console.log("Successfully connected");
            return true;
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        const isConnected = await checkConnection();
        setConnectionStatus(isConnected);
      };
      fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Welcome to the OpenAI-powered Study Guide Generator! Log in or create a new account to get started.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login to Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Account')}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
        {connectionStatus === null && (
            <Text style={styles.paragraph}>Checking connection...</Text>
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