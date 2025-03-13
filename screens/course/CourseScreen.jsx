import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import useFetchCourseAttendaceRecords from '@/hooks/api/attendance/useFetchCourseAttendaceRecords';
import { RefreshControl } from 'react-native-gesture-handler';
import CourseStudentsModal from '@/components/molecules/CourseStudentsModal/CourseStudentModal';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CourseScreen = () => {
  const route = useRoute();
  const { courseId, courseName } = route.params;
  const [ refreshing, setRefreshing ] = useState(false);

  const { isSuccess, isFetching, error, refetch, courseAttendance} = useFetchCourseAttendaceRecords(courseId);

  const students = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Jane Smith", email: "jane@example.com" },
    { id: "4", name: "Jane Smith", email: "jane@example.com" },
    { id: "5", name: "Jane Smith", email: "jane@example.com" },
    { id: "6", name: "Jane Smith", email: "jane@example.com" },
    { id: "7", name: "Jane Smith", email: "jane@example.com" },
    { id: "8", name: "Jane Smith", email: "jane@example.com" },
    { id: "9", name: "Jane Smith", email: "jane@example.com" },
    { id: "10", name: "Jane Smith", email: "jane@example.com" },
    { id: "11", name: "Jane Smith", email: "jane@example.com" },
    { id: "13", name: "Jane Smith", email: "jane@example.com" },
    { id: "14", name: "Jane Smith", email: "jane@example.com" },
    { id: "15", name: "Jane Smith", email: "jane@example.com" },
    { id: "16", name: "Jane Smith", email: "jane@example.com" },
    { id: "17", name: "Jane Smith", email: "jane@example.com" },
    ];

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <CourseStudentsModal students={students} courseId={courseId}/>
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
          <TouchableOpacity  style={styles.attendanceCard}>
            <Text style={styles.dateText}>{new Date(item.date).toDateString()}</Text>
            <Text style={styles.statusText}>{`Attendance - ${item.students.filter(s => s.isPresent).length} / ${item.students.length}`}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />}
      
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
    marginTop: 5,
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
});

export default CourseScreen;