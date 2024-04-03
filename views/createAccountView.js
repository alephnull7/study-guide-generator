import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';

const CreateAccountView = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsChecked(!isChecked);
  }

  const handleCreateAccount = () => {
    if (isChecked) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Instructor Home',
        params: {username: username}}]
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Student Home',
        params: {username: username}}]
      });
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
