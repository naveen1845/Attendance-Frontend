import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetchAllFacultyCourses from '@/hooks/api/courses/useFetchAllFacultyCourses'
import { RefreshControl } from 'react-native-gesture-handler';
import CreateCourseButton from '../molecules/CreateCourseButton/CreateCourseButton';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from '../molecules/LogoutButton/LogoutButton';

const FacultyHome = () => {
  const [ refreshing, setRefreshing ] = useState(false);
  const {isFetching, isSuccess, facultyCourses, refetch} = useFetchAllFacultyCourses();
  const navigation = useNavigation();
    
  const handleCoursePress = (courseId, courseName) => {
    console.log(`Navigating to ${courseId}`)
    navigation.navigate('Course', {courseId: courseId, courseName: courseName});

  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />

      
      <View style={styles.header}>
        <Text style={styles.headerText}>Courses</Text>
        <LogoutButton />
      </View>

      

      {isFetching && refreshing && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
      </View>}

      
      {isSuccess && !refreshing && <FlatList
        data={facultyCourses}
        keyExtractor={(item) => item._id}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard} onPress={() => handleCoursePress(item._id, item.name)}>
            <Text style={styles.courseText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.courseList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />}

          <CreateCourseButton />
          
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
    paddingVertical: 10,
    paddingTop: 40,
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
    paddingBottom: 20,
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
