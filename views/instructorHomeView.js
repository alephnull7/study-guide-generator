import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useAuth } from '../contexts/authContext';

const InstructorHomeView = () => {
    const navigation = useNavigation();
    const { authData, setAuthData } = useAuth();

    const handleLogout = () => {
      setAuthData(null);

      navigation.reset({
        index: 0,
        routes: [{name: "Welcome"}]
      })
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, {authData.username}</Text>
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default InstructorHomeView;
