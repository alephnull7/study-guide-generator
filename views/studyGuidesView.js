import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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

  export default StudyGuidesView;