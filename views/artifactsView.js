import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

const ArtifactsView = () => {
  const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Artifacts</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Study Guides')}
        >
          <Text style={styles.buttonText}>View Study Guides</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quizzes')}
        >
          <Text style={styles.buttonText}>View Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Create Artifact')}
        >
          <Text style={styles.buttonText}>Create New Artifact</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  };

  export default ArtifactsView;
