import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import { sendDataToAPI } from '../helpers/helpers';

const CreateAccountView = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsChecked(!isChecked);
  }

  const handleCreateAccount = async () => {
    try {
        const usernameWithoutDomain = username.split('@')[0];
        
        // Send data to the API
        const response = await sendDataToAPI('users', 'post', {
          'email': username,
          'account_type': isChecked,
          'password': password
        });
  
        // Assuming the API returns a success message upon successful account creation
        if (response.success) {
          // Navigate based on account type
          navigation.reset({
            index: 0,
            routes: [{
              name: isChecked ? 'Instructor Home' : 'Student Home',
              params: { username: usernameWithoutDomain }
            }]
          });
        } else {
          console.error('Account creation failed');
        }
      } catch (error) {
        console.error('Error occurred:', error.message);
      }
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
        autoCompleteType="username"
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
      <View style={[{flexDirection: 'row', margin: 8, padding: 8, alignItems: 'center'}]}>
        <CheckBox
          value={isChecked}
          onValueChange={handleToggle}
        />
        <Text style={styles.label}>Instructor</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
  };

export default CreateAccountView;
