import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ArtifactsView = () => {
  const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Artifacts</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('View Study Guides')}
        >
          <Text style={styles.buttonText}>View Study Guides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>View Quizzes</TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Create Artifact')}
        >
          <Text style={styles.buttonText}>Create New Artifact</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default ArtifactsView;