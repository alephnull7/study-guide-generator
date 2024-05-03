import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useAuth } from '../contexts/authContext';

const ManageStudentsView = ({ navigation }) => {
  const authContext = useAuth();
  const {authData} = authContext;

  React.useEffect(() => {
    navigation.setOptions({ title: `Study Guide Generator - ${authData.username}'s Students`});
  }, []);

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