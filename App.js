import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LandingView from './views/landingView';
import LoginView from './views/loginView';
import CreateAccountView from './views/createAccountView';
import HomeView from './views/homeView';
import StudyGuidesView from './views/studyGuidesView';
import StudyGuideView from "./views/studyGuideView";
import ManageAccountView from './views/manageAccountView';
import ManageStudentsView from './views/manageStudentsView';
import ClassroomsView from "./views/classroomsView";
import CreateClassroomView from "./views/createClassroomView";
import CreateStudyGuideView from "./views/createStudyGuideView";
import ClassroomView from "./views/classroomView";
import { AuthProvider } from './contexts/authContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions = {{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Study Guide Generator',
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen name="Welcome" component={LandingView} />
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Create Account" component={CreateAccountView} />
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Study Guides" component={StudyGuidesView} />
          <Stack.Screen name="Study Guide" component={StudyGuideView} />
          <Stack.Screen name="Manage Account" component={ManageAccountView}/>
          <Stack.Screen name="Manage Students" component={ManageStudentsView}/>
          <Stack.Screen name="Classrooms" component={ClassroomsView}/>
          <Stack.Screen name="Create Classroom" component={CreateClassroomView}/>
          <Stack.Screen name="Create Study Guide" component={CreateStudyGuideView}/>
          <Stack.Screen name="View Classroom" component={ClassroomView}/>
        </Stack.Navigator>
      </AuthProvider>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}
