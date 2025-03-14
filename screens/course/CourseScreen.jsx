import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchCourseAttendaceRecords from '@/hooks/api/attendance/useFetchCourseAttendaceRecords';
import { RefreshControl } from 'react-native-gesture-handler';
import CourseStudentsModal from '@/components/molecules/CourseStudentsModal/CourseStudentModal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useCreateAttendance from '@/hooks/api/attendance/useCreateAttendance';
import { useQueryClient } from '@tanstack/react-query';

const CourseScreen = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const { courseId, courseName } = route.params;
  const navigation = useNavigation();
  const [ refreshing, setRefreshing ] = useState(false);

  const { isSuccess, isFetching, error, refetch, courseAttendance} = useFetchCourseAttendaceRecords(courseId);

  const { createAttendanceMutation } = useCreateAttendance(courseId);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    const handleCourseClick = (attendanceId) => {
        navigation.navigate('AttendanceDetailsScreen', {attendanceId: attendanceId})
    }

    const handleCreateAttendance = async () => {
      try {
        console.log(queryClient.getQueryData(`course-Attendance-${courseId}`));

        await createAttendanceMutation();
        queryClient.invalidateQueries(`course-Attendance-${courseId}`);
      } catch (error) {
        console.log(error);
        
      }

    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <CourseStudentsModal courseId={courseId}/>
            <Text style={styles.headerText}>{courseName}</Text>
            <FontAwesome name='ellipsis-h' size={24} color="white" style={{ fontfamily: 'FontAwesome'}}/>
        </View>

      {isFetching && refreshing && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
        </View>}
      
      {isSuccess && !refreshing && <FlatList
        data={courseAttendance}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity  style={styles.attendanceCard} onPress={() => handleCourseClick(item?._id)}>
            <Text style={styles.dateText}>{new Date(item.date).toDateString()}</Text>
            <Text style={styles.statusText}>{`${item.students.filter(s => s.isPresent).length}/${item.students.length}`}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />}

      <TouchableOpacity
      style={styles.button}
      onPress={handleCreateAttendance}
      >
          <Text
            style={styles.buttonText}
          >
              create new attendance
          </Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Attendance - Naveen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
  },
  header: {
    backgroundColor: '#161B33', // Darker shade for contrast
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700' // Gold accent
  },
  headerText: {
    color: '#FFD700', // Gold for premium feel
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  listContainer: {
    padding: 15,
  },
  attendanceCard: {
    backgroundColor: '#1C2541',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#FFD700',
  },
  dateText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    backgroundColor: '#0A0F24',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  footer: {
    backgroundColor: '#161B33',
    paddingVertical: 10,
    paddingBottom: 20,
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 2,
    borderTopColor: '#FFD700',
  },
  footerText: {
    color: '#FFD700',
    fontSize: 8,
  },
  button: {
    position: "absolute",
    bottom: 60, // Adjust as needed
    alignSelf: "center", // Centers it horizontally
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  
  buttonText: {
    color: "#0A0F24",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase"
  },
});

export default CourseScreen;