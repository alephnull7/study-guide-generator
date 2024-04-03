import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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

  export default ManageAccountView;