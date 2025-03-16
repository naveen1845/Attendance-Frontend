import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const StudentAttendanceDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { attendanceData, studentId } = route.params;
  
    const studentRecords = [];
    let totalClasses = 0;
    let attendedClasses = 0;
    let presentStreak = 0;
    let absentStreak = 0;
    let currentStreak = 0;
    let lastStatus = null;
  
    attendanceData.forEach((record) => {
      const student = record.students.find((s) => s.studentId._id === studentId);
      if (student) {
        const status = student.isPresent ? "Present" : "Absent";
        studentRecords.push({
          date: new Date(record.date).toLocaleDateString(),
          status: status,
        });
  
        totalClasses++;
        if (student.isPresent) {
          attendedClasses++;
          if (lastStatus === "Present") {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
          presentStreak = Math.max(presentStreak, currentStreak);
        } else {
          if (lastStatus === "Absent") {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
          absentStreak = Math.max(absentStreak, currentStreak);
        }
        lastStatus = status;
      }
    });
  
    const attendancePercentage =  studentRecords.length > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(2) : "N/A"
    const studentInfo = attendanceData[0]?.students.find((s) => s.studentId._id === studentId)?.studentId;
    const studentName = studentInfo?.name;
    const rollNo = studentInfo?.roll_no;
  
    return (
      <View style={styles.container}>
        <FlatList
          data={studentRecords}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>{studentName}</Text>
                <Text style={styles.headerText}>Roll No: {rollNo}</Text>
              </View>
  
              <View style={styles.listContainer}>
                <Text style={styles.dateText}>📊 Attendance Summary</Text>
                <Text style={styles.statusText}>Total Classes Conducted: {totalClasses}</Text>
                <Text style={styles.statusText}>Total Attended: {attendedClasses}</Text>
                <Text style={styles.statusText}>Total Absences: {totalClasses - attendedClasses}</Text>
                <Text style={styles.statusText}>
                  Attendance Percentage: <Text style={{ color: attendancePercentage >= 75 ? "#00FF00" : "#FF0000" }}>
                    {attendancePercentage}%
                  </Text>
                </Text>
                <Text style={styles.statusText}>Present Streak: {presentStreak} days</Text>
                <Text style={styles.statusText}>Absent Streak: {absentStreak} days</Text>
                <Text style={styles.statusText}>
                  Most Recent Attendance: {studentRecords.length > 0 ? studentRecords[0].status : "N/A"}
                </Text>
              </View>
  
              <View style={styles.listContainer}>
                <Text style={styles.dateText}>📅 Attendance History</Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.attendanceCard}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={[styles.statusText, { color: item.status === "Present" ? "#00FF00" : "#FF0000" }]}>
                {item.status}
              </Text>
            </View>
          )}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Attendance - Naveen</Text>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F24",
  },
  header: {
    backgroundColor: "#161B33",
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700",
  },
  headerText: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  listContainer: {
    padding: 15,
    gap: 10
  },
  attendanceCard: {
    backgroundColor: "#1C2541",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#FFD700",
  },
  dateText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#0A0F24",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
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

export default StudentAttendanceDetails;
