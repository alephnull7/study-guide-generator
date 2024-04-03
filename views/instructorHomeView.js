import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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

  export default InstructorHomeView;