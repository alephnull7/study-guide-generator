import React, { useState } from 'react';
import {sendDataToAPI} from "../helpers/helpers";
import styles from "./styles";
import {Text, View} from "react-native";

function CreateClassroomView() {
    const [formData, setFormData] = useState({
        // Initialize formData state with empty values for your form fields
        name: '',
        user_id: 6
        // Add more fields as needed
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendDataToAPI('classrooms', 'post', formData);
            console.log('Response from server:', response);
            setFormData({
                name: '',
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Classroom</Text>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Classroom Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </View>
    );
}

export default CreateClassroomView;
