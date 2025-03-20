import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchCourseAttendaceRecords from '@/hooks/api/attendance/useFetchCourseAttendaceRecords';
import { RefreshControl } from 'react-native-gesture-handler';
import CourseStudentsModal from '@/components/molecules/CourseStudentsModal/CourseStudentModal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useCreateAttendance from '@/hooks/api/attendance/useCreateAttendance';
import { useQueryClient } from '@tanstack/react-query';
import Sidebar from '@/components/molecules/AttendanceSidebar/AttendanceSidebar';
import FilterModal from '@/components/molecules/FilterAttendanceModal/FilterAttendanceModal';

const CourseScreen = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const { courseId, courseName } = route.params;
  const navigation = useNavigation();
  const [ refreshing, setRefreshing ] = useState(false);
  const [sidebarVisibility, setSidebarVisibililty] = useState(false);
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date().setHours(23,59,59,59));

  const { isSuccess, isFetching, error, refetch, courseAttendance} = useFetchCourseAttendaceRecords(courseId, startDate, endDate);

  const { createAttendanceMutation } = useCreateAttendance(courseId);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    const handleCourseClick = (attendanceId) => {
        navigation.navigate('AttendanceDetailsScreen', {attendanceId: attendanceId, courseId: courseId})
    }

    const handleCreateAttendance = async () => {
      try {
        console.log(queryClient.getQueryData([`course-Attendance-${courseId}`]));
        console.log("Active queries:", queryClient.getQueryCache().queries);

        await createAttendanceMutation();
        queryClient.invalidateQueries([`course-Attendance-${courseId}`]);
      } catch (error) {
        console.log(error);
        
      }

    }

    const onApplyFilter = async (start, end) => {
      setStartDate(start);
      setEndDate(end);
      await refetch();
    }

    const onReset = async () => {
      setStartDate(new Date('2025-01-01'));
      setEndDate(new Date());
      await refetch();
    }

    const onClose = () => setSidebarVisibililty(false);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <CourseStudentsModal courseId={courseId} attendaceData={courseAttendance}/>
            <Text style={styles.headerText}>{courseName}</Text>

            <View style={{flexDirection: "row", gap: 20}}>
              <FilterModal onApplyFilter={onApplyFilter} onResetFilter={onReset}/>
  
              <TouchableOpacity onPress={() => setSidebarVisibililty(true)}>
                <FontAwesome name='bars' size={24} color="white" style={{ fontfamily: 'FontAwesome'}}/>
              </TouchableOpacity>
            </View>

        </View>

        
        <Sidebar isVisible={sidebarVisibility} onClose={onClose} courseAttendance={courseAttendance}/>
        
          

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
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  listContainer: {
    padding: 15,
    paddingBottom: 55
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
    bottom: 53, // Adjust as needed
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