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
 


export default function App() {
  const Stack = createStackNavigator();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <AppContextProvider>

          <Stack.Navigator initialRouteName='FacultyScreen'>

            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Signup' component={SignupScreen} options={{headerShown: false}}/>

            <Stack.Screen 
              name='FacultyScreen'
              options={{headerShown: false}}
            >
              {() => (
                <ProtectedScreens><FacultyHome /></ProtectedScreens>
              )}
            </Stack.Screen>

          </Stack.Navigator>
          
      </AppContextProvider>
    </NavigationContainer>
    <Toast/>
    </QueryClientProvider>
    
      
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff', // White text for contrast
    fontSize: 34

  }
})