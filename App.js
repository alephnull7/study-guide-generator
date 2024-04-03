import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LandingView from './views/landingView';
import LoginView from './views/loginView';
import CreateAccountView from './views/createAccountView';
import StudentHomeView from './views/studentHomeView';
import InstructorHomeView from './views/instructorHomeView';
import StudyGuidesView from './views/studyGuidesView';
import QuizzesView from './views/quizzesView';
import ManageAccountView from './views/manageAccountView';
import ManageStudentsView from './views/manageStudentsView';
import ViewStudyGuidesView from "./views/viewStudyGuidesView";
import ViewClassroomsView from "./views/viewClassroomsView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="Student Home" component={StudentHomeView} />
        <Stack.Screen name="Instructor Home" component={InstructorHomeView} />
        <Stack.Screen name="Study Guides" component={StudyGuidesView}/>
        <Stack.Screen name="Quizzes" component={QuizzesView}/>
        <Stack.Screen name="Manage Account" component={ManageAccountView}/>
        <Stack.Screen name="Manage Students" component={ManageStudentsView}/>
        <Stack.Screen name="View Study Guides" component={ViewStudyGuidesView}/>
        <Stack.Screen name="View Classrooms" component={ViewClassroomsView}/>
      </Stack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}