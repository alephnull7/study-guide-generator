import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { fetchDataFromAPI } from '../helpers/helpers';

const LandingView = () => {
    const navigation = useNavigation();
    const [connectionStatus, setConnectionStatus] = useState(true);

    useEffect(() => {
      checkConnection();
    }, []);

    const checkConnection = async () => {
      const data = await fetchDataFromAPI('artifacts/study-guides/1');
      if(data.length === 0 || !data) {
        console.error("Connection failed");
        setConnectionStatus(false);
      } else {
        console.log("Successfully connected");
      }
    }
  
    return (
      <View style={styles.container}>
      {connectionStatus === true && (
        <Text style={styles.paragraph}></Text>
      )}
      {connectionStatus === false && (
        <Text style={styles.connectionFailed}>
          Connection failed. Please check your internet connection and try again.
        </Text>
      )}
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum.
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
      </View>
    );
  };

  export default LandingView;
