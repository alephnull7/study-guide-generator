import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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

  export default ManageStudentsView;