import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FacultyHome from './components/FacultyHome'


export default function App() {
  return (
      <View style={styles.container}>
        <FacultyHome />
      </View>
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