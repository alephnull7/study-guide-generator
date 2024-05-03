import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/styles';
import { sendDataToAPI } from '../helpers/helpers';
import { useAuth } from '../contexts/authContext';

const CreateAccountView = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [createAccountError, setCreateAccountError] = React.useState('');
  const [isPosting, setIsPosting] = React.useState(false);
  const navigation = useNavigation();
  const authContext = useAuth();
  const { setAuthData } = authContext;

  React.useEffect(() => {
    navigation.setOptions({ title: "Create New Account"});
  }, []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  }

  const handleCreateAccount = async () => {
    try {
        let account_type;

        if(isChecked) account_type = 1;
        else account_type = 0;
        
        // Send data to the API
        setIsPosting(true);
        const response = await sendDataToAPI('auth/create', 'post', {
          'email': email,
          'account_type': account_type,
          'password': password
        }, authContext);
  
        // Assuming the API returns a success message upon successful account creation
        if (response.status === 201) {
          setAuthData(response.body);

          // Navigate based on account type
          navigation.reset({
            index: 0,
            routes: [{
              name: 'Home'
            }]
          });
        } else {
          console.error('Error occurred:', response.body.message);
          setCreateAccountError(`${response.body.message}. Please try again.`);
        }
      } catch (error) {
        console.error('Error occurred:', error.message);
        setCreateAccountError(`Unexpected error. Please try again.`);
      } finally {
        setIsPosting(false);
      }
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Create a brand new account for you to use this app.
      </Text>
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
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
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox 
          onPress={handleToggle}
          fillColor="orange"
          unFillColor="rgb(175, 175, 175)"/>
        <Text style={styles.label}>Instructor</Text>
      </View>
      {createAccountError !== '' && (
          <Text style={styles.errorText}>{createAccountError}</Text>
      )}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={isPosting}/>
    </View>
    </View>
  );
};

export default CreateAccountView;
