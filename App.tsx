import { StyleSheet } from 'react-native'
import React from 'react'
import SignupScreen from './screens/auth/SignupScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/auth/LoginScreen';
import FacultyHome from './components/organisms/FacultyHome';
import { AppContextProvider } from './contexts/AppContextProvider';
import { ProtectedScreens } from './components/molecules/ProtectedScreen';
import CourseScreen from './screens/course/CourseScreen';
import AttendanceDetailsScreen from './screens/attendance/AttendanceDetailsScreen';
import StudentAttendanceDetails from './screens/studentAttendanceDetails/StudentAttendanceDetails';
import Analytics from './screens/studentAttendanceDetails/Analytics.jsx';
 
export default function App() {
  const Stack = createStackNavigator();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <AppContextProvider>

          <Stack.Navigator initialRouteName='Login'>

            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Signup' component={SignupScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Course' options={{headerShown: false}}>
              {
                () => (
                  <ProtectedScreens><CourseScreen /></ProtectedScreens>
                )
              }

            </Stack.Screen>

            <Stack.Screen 
              name='FacultyScreen'
              options={{headerShown: false}}
            >
              {() => (
                <ProtectedScreens><FacultyHome /></ProtectedScreens>
              )}
            </Stack.Screen>

            <Stack.Screen 
              name='AttendanceDetailsScreen'
              options={{headerShown: false}}
            >
              {() => (
                <ProtectedScreens><AttendanceDetailsScreen /></ProtectedScreens>
              )}
            </Stack.Screen>

            <Stack.Screen 
              name='StudentAttendanceDetails'
              options={{headerShown: false}}
            >
              {() => (
                <ProtectedScreens><StudentAttendanceDetails /></ProtectedScreens>
              )}
            </Stack.Screen>

            <Stack.Screen 
              name='AnalyticsScreen'
              options={{headerShown: false}}
            >
              {() => (
                <ProtectedScreens><Analytics /></ProtectedScreens>
              )}
            </Stack.Screen>

          </Stack.Navigator>
          
      </AppContextProvider>
    </NavigationContainer>
    <Toast/>
    </QueryClientProvider>
    
      
  )
}
