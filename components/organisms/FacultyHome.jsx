import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'

const FacultyHome = () => {
    const courses = [
        { id: '1', name: 'Operating Systems' },
        { id: '2', name: 'Data Structures' },
        { id: '3', name: 'Database Management' },
        { id: '4', name: 'Computer Networks' },
        { id: '5', name: 'Software Engineering' },
        { id: '6', name: 'Artificial Intelligence' },
        { id: '7', name: 'Machine Learning' },
        { id: '8', name: 'Cyber Security' },
        { id: '9', name: 'Cloud Computing' },
        { id: '10', name: 'Mobile App Development' },
        { id: '11', name: 'Web Technologies' },
        { id: '12', name: 'Blockchain Technology' }
    ]
    

  const handleCoursePress = (courseName) => {
    console.log(`Navigating to ${courseName}`)
    // Navigation logic can be added here
  }

  return (
    <View style={styles.container}>
      {/* Status Bar for better UI */}
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Courses</Text>
      </View>

      {/* Course List */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard} onPress={() => handleCoursePress(item.name)}>
            <Text style={styles.courseText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.courseList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Attendance - Naveen</Text>
      </View>
    </View>
  )
}

export default FacultyHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0A0F24' // Deep dark blue
  },
  header: {
    backgroundColor: '#161B33', // Darker shade for contrast
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700' // Gold accent
  },
  headerText: {
    color: '#FFD700', // Gold for premium feel
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  courseList: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  courseCard: {
    backgroundColor: '#1C2541', // Dark blue for depth
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFD700', // Neon Gold Border
    transform: [{ scale: 1 }],
    transition: '0.3s'
  },
  courseCardPress: {
    transform: [{ scale: 0.95 }]
  },
  courseText: {
    color: '#FFD700', // Gold neon
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  footer: {
    backgroundColor: '#161B33',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 2,
    borderTopColor: '#FFD700'
  },
  footerText: {
    color: '#FFD700',
    fontSize: 8
  }
})
