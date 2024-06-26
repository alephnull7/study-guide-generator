/*
    Author: Xander Renkema, Gregory Smith
    Date: May 6, 2024
*/

import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/authContext';
import { sendDataToAPI } from '../helpers/helpers';

const LoginView = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [isPosting, setIsPosting] = React.useState(false);
    const navigation = useNavigation();
    const authContext = useAuth();
    const { setAuthData } = authContext;

    React.useEffect(() => {
      navigation.setOptions({ title: "Login"});
    }, []);

    const handleLogin = async () => {
      try {
        // Send POST request to backend for authentication
        setIsPosting(true);
        const response = await sendDataToAPI('auth/login', 'POST', {
          'email': email,
          'password': password,
        }, authContext);

        if (response.status !== 201) {
            throw new Error("Unsuccessful response status");
        }

        // Save auth token to local storage or state for future use
        setAuthData(response.body);
  
        // Navigate to the home screen after successful login
        navigation.reset({
          index: 0,
          routes: [{
            name: 'Home'
          }]
        });
      } catch (error) {
        console.error('Error logging in:', error.message);
        setLoginError('Login failed. Please check your info or internet connection and try again.');
      } finally {
        setIsPosting(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Log in to your account to access your study guides (or classrooms if you are an instructor).
        </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType="password"
        />
        {loginError !== '' && (
          <Text style={styles.errorText}>{loginError}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={isPosting}/>
      </View>
      </View>
    );
  };

  export default LoginView;
