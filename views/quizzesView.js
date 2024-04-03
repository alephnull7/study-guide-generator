import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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

  export default QuizzesView;