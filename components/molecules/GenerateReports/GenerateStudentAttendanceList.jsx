import React from "react";
import { Button, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const GenerateStudentAttendanceList = ({ attendanceRecords }) => {
    const createPDF = async () => {
        const studentAttendanceMap = {};

        // Iterate over attendance records to count presence for each student
        attendanceRecords.forEach(record => {
        record.students.forEach(student => {
            const id = student.studentId._id;
            if (!studentAttendanceMap[id]) {
            studentAttendanceMap[id] = {
                name: student.studentId.name,
                rollNo: student.studentId.roll_no,
                presentCount: 0,
            };
            }
            if (student.isPresent) {
            studentAttendanceMap[id].presentCount += 1;
            }
        });
        });

        const courseName = attendanceRecords[0].course.name;

        const toDate = new Date(attendanceRecords[0].date).toLocaleDateString();
        const fromDate = new Date(attendanceRecords[attendanceRecords.length - 1].date).toLocaleDateString();

        const totalClasses = attendanceRecords.length;

        // Generate HTML
        const htmlContent = `
        <html>
        <head>
            <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h3 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Student Attendance Report</h2>
            <h3>Course: ${courseName}</h3>
            <h3>From: ${fromDate} To: ${toDate}</h3>
            <h3>Total Classes Conducted: ${totalClasses}</h3>
            <table>
            <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Present Count</th>
                <th>Total Classes</th>
                <th>Attendance Percentage</th>
            </tr>
            ${Object.values(studentAttendanceMap).map(student => `
                <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.presentCount}</td>
                <td>${totalClasses}</td>
                <td>${((student.presentCount / totalClasses) * 100).toFixed(2)}%</td>
                </tr>
            `).join('')}
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

    }

  return (
      <TouchableOpacity style={styles.button} onPress={async () => await createPDF()}>
        <FontAwesome name="download" size={15} color="white"/>
        <Text style={styles.buttonText}>Students Attendance List</Text>
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

export default GenerateStudentAttendanceList