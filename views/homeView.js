/*
    Author: Xander Renkema, Gregory Smith
    Date: May 6, 2024
*/

import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useAuth } from '../contexts/authContext';

const HomeView = () => {
    const navigation = useNavigation();
    const { authData, setAuthData } = useAuth();

    React.useEffect(() => {
        navigation.setOptions({ title: `Welcome, ${authData.username}`});
      }, []);

    const handleLogout = () => {
        setAuthData(null);

        navigation.reset({
            index: 0,
            routes: [{name: "Welcome"}]
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Review your study guides or manage your account. Instructors also have the ability to manage their classes and students.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Study Guides')}
            >
                <Text style={styles.buttonText}>Study Guides</Text>
            </TouchableOpacity>
            {Boolean(authData.account_type) && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Classrooms')}
                >
                    <Text style={styles.buttonText}>Classrooms</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Manage Account')}
            >
                <Text style={styles.buttonText}>Manage Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeView;
