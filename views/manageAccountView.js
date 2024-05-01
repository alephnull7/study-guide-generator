import * as React from 'react';
import {View, Text, TouchableOpacity, Modal, Pressable, TextInput, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../styles/styles';
import { useAuth } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { sendDataToAPI } from "../helpers/helpers";

const ManageAccountView = () => {
    const navigation = useNavigation();
    const authContext = useAuth();
    const { authData, setAuthData } = authContext;

    // update form and modal states
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [userProperty, setUserProperty] = React.useState();

    // informational text
    const [errorText, setErrorText] = React.useState('');
    const [successText, setSuccessText] = React.useState('');

    // text input state
    const [inputVisible, setInputVisible] = React.useState(false);
    const [inputText, setInputText] = React.useState('');
    const [inputPlaceholder, setInputPlaceholder] = React.useState('');
    const [inputAutoComplete, setInputAutoComplete] = React.useState('off');
    const [inputSecureTextEntry, setInputSecureTextEntry] = React.useState(false);

    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleUserUpdate = async() => {
        try {
            const body = {
                uid: authData.uid,
            };
            body[userProperty] = inputText;
            const response = await sendDataToAPI(`users`, 'PUT', body, authContext);
            if (response.status !== 200) {
                throw new Error("Unsuccessful account update");
            }

            if (userProperty === 'username') {
                setAuthData({
                    ...authData,
                    username: inputText
                })
            }
            setInputText('');

            setErrorText('');
            setSuccessText(`${inputPlaceholder} successfully updated.`);
        } catch (error) {
            console.error(`Error updating ${userProperty}:`, error.message);
            setInputText('');
            setSuccessText('');
            setErrorText(`Unable to update ${userProperty}.`);
        }
    }

    const handleDeletion = async () => {
        try {
            setDeleteVisible(!deleteVisible);
            setIsDeleting(true);
            const response = await sendDataToAPI(`users/${authData.uid}`, 'DELETE', {}, authContext);
            if (response.status !== 200) {
                throw new Error("Unsuccessful deletion");
            }

            setAuthData(null);
            navigation.reset({
                index: 0,
                routes: [{name: "Welcome"}]
            })
        } catch (error) {
            console.error('Error deleting account:', error.message);
            setSuccessText('');
            setErrorText('Unable to delete account.');
        } finally {
            setIsDeleting(false);
        }
    }

    const DeleteAccountModal = ({ visible, onClose, onSubmit }) => {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>
                            Confirm Deletion
                        </Text>
                        <Text style={styles.modalText}>
                            Are you sure you would like to delete your account?
                            {"\n"}
                            This is irreversible and will delete everything associated with your account.
                        </Text>
                        <View style={styles.buttonGroup}>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.buttonContainer]}
                                onPress={onSubmit}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.buttonContainer]}
                                onPress={onClose}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const updateForm = (itemValue) => {
        setUserProperty(itemValue);
        setInputText('');
        if (itemValue === 'user-property') {
            setInputVisible(false);
            return;
        } else {
            setInputVisible(true);
        }

        const placeholder = itemValue.charAt(0).toUpperCase() + itemValue.substring(1);
        const secureTextEntry = itemValue === 'password';
        setInputPlaceholder(placeholder);
        setInputAutoComplete(itemValue);
        setInputSecureTextEntry(secureTextEntry);
    };

    return (
        <View
            style={styles.container}>
            <Text style={styles.header}>Manage Account</Text>
            <Text style={styles.button}>
                Update Account
            </Text>
            <View>
                <Picker
                    selectedValue={userProperty}
                    onValueChange={(itemValue, itemIndex) =>
                        updateForm(itemValue)
                    }>
                    <Picker.Item label="User Property" value="user-property" />
                    <Picker.Item label="Username" value="username" />
                    <Picker.Item label="Email" value="email" />
                    <Picker.Item label="Password" value="password" />
                </Picker>
                {inputVisible && (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder={inputPlaceholder}
                            autoCapitalize="none"
                            autoCompleteType={inputAutoComplete}
                            autoCorrect={false}
                            secureTextEntry={inputSecureTextEntry}
                        >
                        </TextInput>
                        <TouchableOpacity
                            style={styles.button} onPress={handleUserUpdate}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setDeleteVisible(true)}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
            {errorText !== '' && (
                <Text style={styles.errorText}>{errorText}</Text>
            )}
            {successText !== '' && (
                <Text style={styles.successText}>{successText}</Text>
            )}
            <DeleteAccountModal
                visible={deleteVisible}
                onClose={() => setDeleteVisible(false)}
                onSubmit={handleDeletion}
            />
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={isDeleting}/>
        </View>
    );
  };

  export default ManageAccountView;