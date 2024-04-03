import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';

const LandingView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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

const LoginView = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateAccountView = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const StudentHomeView = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Account</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Study Guides')}
      >
        <Text style={styles.buttonText}>Study Guides</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Quizzes')}
      >
        <Text style={styles.buttonText}>Quizzes</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Manage Account')}
      >
        <Text style={styles.buttonText}>Manage Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const InstructorHomeView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Account</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Study Guides')}
      >
        <Text style={styles.buttonText}>Study Guides</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Quizzes')}
      >
        <Text style={styles.buttonText}>Quizzes</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Manage Account')}
      >
        <Text style={styles.buttonText}>Manage Account</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Manage Students')}
      >
        <Text style={styles.buttonText}>Manage Students</Text>
      </TouchableOpacity>
    </View>
  );
};

const StudyGuidesView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Guides</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Study Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Study Guides</Text>
      </TouchableOpacity>
    </View>
  );
};

const QuizzesView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quizzes</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Quizzes</Text>
      </TouchableOpacity>
    </View>
  );
};

const ManageAccountView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Account</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const ManageStudentsView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Students</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Classroom</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Classrooms</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#00cc00',
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    marginLeft: 8
  }
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Instructor Home" screenOptions = {{
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: 'Study Guide Generator',
      headerTitleAlign: 'center'
    }}>
        <Stack.Screen name="Welcome" component={LandingView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Create Account" component={CreateAccountView} />
        <Stack.Screen name="Student Home" component={StudentHomeView} />
        <Stack.Screen name="Instructor Home" component={InstructorHomeView} />
        <Stack.Screen name="Study Guides" component={StudyGuidesView}/>
        <Stack.Screen name="Quizzes" component={QuizzesView}/>
        <Stack.Screen name="Manage Account" component={ManageAccountView}/>
        <Stack.Screen name="Manage Students" component={ManageStudentsView}/>
      </Stack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}