import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';

const ManageStudentsView = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Classroom')}
        >
          <Text style={styles.buttonText}>Create Classroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Classrooms')}
        >
        <Text style={styles.buttonText}>View Classrooms</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default ManageStudentsView;