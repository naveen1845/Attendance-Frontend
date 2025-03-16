import React from "react";
import { Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const GenerateAttendanceReport = ({ attendanceRecords }) => {

  const createPDF = async () => {
    if (!attendanceRecords || attendanceRecords.length === 0) {
    Alert.alert("No Data", "No attendance records available to generate a PDF.");
    return;
  }

  const courseName = attendanceRecords[0].course.name;

  const toDate = new Date(attendanceRecords[0].date).toLocaleDateString();
  const fromDate = new Date(attendanceRecords[attendanceRecords.length - 1].date).toLocaleDateString();
  
  // Calculate total students and total present count
  let totalStudents = 0;
  let totalPresent = 0;
  
  attendanceRecords.forEach(record => {
    totalStudents += record.students.length;
    totalPresent += record.students.filter(s => s.isPresent).length;
  });
  
  // Calculate overall attendance percentage
  const overallAttendance = totalStudents > 0 ? ((totalPresent / totalStudents) * 100).toFixed(2) : "0.00";
  
  // Generate the HTML content
  const htmlContent = `
  <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2, h3 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .status-present { color: green; font-weight: bold; }
          .status-absent { color: red; font-weight: bold; }
        </style>
      </head>
      <body>
  
        <h2>Attendance Report</h2>
        <h3>Course: ${courseName}</h3>
        <h3>From: ${fromDate} To: ${toDate}</h3>
        <h3>Overall Attendance: ${overallAttendance}%</h3>
  
        <table>
          <tr>
            <th>Date</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Total Students</th>
          </tr>
          ${attendanceRecords.map(record => {
            const totalStudents = record.students.length;
            const presentCount = record.students.filter(s => s.isPresent).length;
            const absentCount = totalStudents - presentCount;
  
            return `
              <tr>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${presentCount}</td>
                <td>${absentCount}</td>
                <td>${totalStudents}</td>
              </tr>
            `;
          }).join('')}
        </table>
  
      </body>
  </html>
  `;
  
  module.exports = htmlContent;
  

    try {
      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: "Attendance_Report",
        base64: false,
        directory: 'Documents'
      });

      Toast.show({
            type: 'success',
            text1: 'PDF Downloaded Successfully',
            visibilityTime: 3000,
            position: 'top',
        })


    } catch (error) {
      console.log("PDF Generation Error: ", error);
      Alert.alert("Error", "Failed to generate PDF");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={async () => await createPDF()}>
      <FontAwesome name="download" size={15} color="white"/>
      <Text style={styles.buttonText}>Course Attendace</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
    marginLeft:"10",
    marginBottom: 10,
    flexDirection: "row",
    gap: 10
  },
  buttonText: {
    gap: 2,
    fontSize: 12,
    color: 'white'
  },
});

export default GenerateAttendanceReport;


