import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";
import { fetchDataFromAPI } from '../helpers/helpers';
import { useAuth } from "../contexts/authContext";

const ClassroomsView = ({ navigation }) => {
  const authContext = useAuth();
  const {authData} = authContext;

  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // informational text
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: `${authData.username}'s Classrooms`});
    fetchAndSetClassrooms();
  }, []);

  const fetchAndSetClassrooms = async () => {
    try {
        const response = await fetchDataFromAPI(`classrooms/${authData.uid}`, authContext);
        switch (response.status) {
            case 204:
                setErrorText('');
                setSuccessText('You have no classrooms.');
                return;
            case 200:
                setErrorText('');
                setClassrooms(response.body);
                return;
            default:
                throw new Error("Unsuccessful retrieval of classrooms");

        }
    } catch (error) {
        console.error(`Error getting classrooms:`, error.message);
        setErrorText(`Unable to access classrooms.`);
    } finally {
        setIsLoading(false);
    }
};

    return (
      <View style={styles.container}>
        {isLoading ?
                <ActivityIndicator
                    size="large"
                    color="#0000ff"/> :
                classrooms.length > 0 ? (
                <ScrollView>
                    {Object.values(classrooms).map(classroom => (
                        <TouchableOpacity
                            key={classroom.id}
                            style={styles.button}
                            onPress={() => navigation.navigate('View Classroom', { classroom: classroom })}>
                            <Text style={styles.buttonText}>
                                {classroom.name}
                                {"\n"}
                                {classroom.code}
                                {"\n"}
                                {classroom.course}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                ) : (
                <View>
                {errorText !== '' && (
                    <Text style={styles.errorText}>{errorText}</Text>
                )}
                {successText !== '' && (
                    <Text style={styles.successText}>{successText}</Text>
                )}
                </View>
                )
            }
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Classroom')}
        >
          <Text style={styles.buttonText}>Create Classroom</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default ClassroomsView;