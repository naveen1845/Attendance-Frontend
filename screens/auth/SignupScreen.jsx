import { useSignUp } from '@/hooks/api/auth/useSignUp';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const [validationError, setValidationError] = useState(null);

  const { signupMutation, isSuccess} = useSignUp();

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!email || !password || !confirmpassword || !name) {
        setValidationError({message: 'All fields are required'});
        return; 
    }

    if(password !== confirmpassword){
        setValidationError({message: 'Passwords do not match'});
        return; 
    }

    setValidationError(null);

    await signupMutation({name, email, password});

  };

  useEffect(() => {
    if (isSuccess == true) {
        navigation.navigate('Login');
        
    }
  }, [isSuccess])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <Text style={styles.title}>Create an Account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#BBB"
        value={name}
        onChangeText={setName}
      />
      
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#BBB"
        secureTextEntry
        value={confirmpassword}
        onChangeText={setConfirmpassword}
      />

      {validationError && <Text style={styles.validationerrorText}>{validationError.message}</Text>}
      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30
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
    elevation: 4
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginText: {
    color: '#BBB',
    marginTop: 20,
    fontSize: 14
  },
  validationerrorText: {
    color: '#FF0000',
    marginBottom: 5,
    fontSize: 14
  }
});

export default SignupScreen;
