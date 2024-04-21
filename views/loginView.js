import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/authContext';
import { sendDataToAPI } from '../helpers/helpers';

const LoginView = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const navigation = useNavigation();
    const { setAuthData } = useAuth();

    const handleLogin = async () => {
      try {
        // Send POST request to backend for authentication
        const response = await sendDataToAPI('auth/login', 'POST', {
          'email': email,
          'password': password,
        });
  
        // Assuming the response contains an auth token
        const authToken = response.token;
        const user_id = response.uid;
        const username = response.username;
        const account_type = response.account_type;
        let isInstructor;

        if(account_type === 1) isInstructor = true;
        else isInstructor = false;
  
        // Save auth token to local storage or state for future use
        setAuthData(authToken, user_id, username);
  
        // Navigate to the home screen after successful login
        navigation.reset({
          index: 0,
          routes: [{
            name: isInstructor ? 'Instructor Home' : 'Student Home',
            params: { username: username }
          }]
        });
      } catch (error) {
        console.error('Error logging in:', error.message);
        setLoginError('Incorrect email or password. Please try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
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
      </View>
    );
  };

  export default LoginView;
