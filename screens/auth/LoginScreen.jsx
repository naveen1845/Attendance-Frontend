import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useLogIn } from '@/hooks/api/auth/useLogIn';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, loginMutation} = useLogIn();
  
    const handleSignin = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setValidationError({ message: 'Email and password are required' });
        return;
      }
  
      setValidationError(null);

      loginMutation({email, password});
  
    };
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
  
        <Text style={styles.title}>Sign In</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#BBB"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#BBB"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
  
        {validationError && (
          <Text style={styles.errorText}>{validationError.message}</Text>
        )}
  
        <TouchableOpacity style={styles.button} onPress={handleSignin} disabled={false}>
          <Text style={styles.buttonText}>{false ? 'Logging In...' : 'Log In'}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 30,
    },
    input: {
      width: '100%',
      backgroundColor: '#1E1E1E',
      padding: 15,
      borderRadius: 10,
      color: '#FFF',
      fontSize: 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      width: '100%',
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      elevation: 4,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signupText: {
      color: '#BBB',
      marginTop: 20,
      fontSize: 14,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      fontSize: 14,
    },
  });

export default LoginScreen