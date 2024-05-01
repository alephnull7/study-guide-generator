import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useAuth } from '../contexts/authContext';

const HomeView = () => {
    const navigation = useNavigation();
    const { authData, setAuthData } = useAuth();

    const handleLogout = () => {
        setAuthData(null);

        navigation.reset({
            index: 0,
            routes: [{name: "Welcome"}]
        })
    }

    return (
        <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.header}>Welcome, {authData.username}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Artifacts')}
            >
                <Text style={styles.buttonText}>Artifacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Manage Account')}
            >
                <Text style={styles.buttonText}>Manage Account</Text>
            </TouchableOpacity>
            {Boolean(authData.account_type) && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Manage Students')}
                >
                    <Text style={styles.buttonText}>Manage Students</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

export default HomeView;
