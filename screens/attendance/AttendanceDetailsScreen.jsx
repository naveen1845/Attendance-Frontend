
import useFetchAttendaceDetails from "@/hooks/api/attendance/useFetchAttendaceDetails";
import useUpdateAttendance from "@/hooks/api/attendance/useUpdateAttendance";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DeleteModal from "@/components/molecules/DeleteModal/DeleteModal";
import useDeleteAttendance from "@/hooks/api/attendance/useDeleteAttendance";

const AttendanceDetailsScreen = () => {
    const route = useRoute();
    const queryClient = useQueryClient();
    const { attendanceId, courseId } = route.params;

    const { isFetching, error, isSuccess, attendanceDetails: attendanceRecord } = useFetchAttendaceDetails(attendanceId);
    const { updateAttendanceMutation } = useUpdateAttendance(attendanceId);

    const [attendance, setAttendance] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const { isPending, deleteAttendanceMutation} = useDeleteAttendance(attendanceId)
    const navigation = useNavigation();

    useEffect(() => {
        if (isSuccess) {
            setAttendance(attendanceRecord?.students);
        }
    }, [attendanceRecord]);

    const handleDelete = async () => {
            await deleteAttendanceMutation();
            queryClient.invalidateQueries([`course-Attendance-${courseId}`]);
            navigation.goBack();
    }

    const toggleAttendance = (studentId) => {
        setAttendance(prevAttendance =>
            prevAttendance.map(student =>
                student._id === studentId
                    ? { ...student, isPresent: !student.isPresent }
                    : student
            )
        );
    };

    const handleSaveChanges = async () => {
        console.log("Saving changes...");
        await updateAttendanceMutation(attendance);
        queryClient.invalidateQueries(`attendance-details-${attendanceId}`);
        queryClient.invalidateQueries(`course-Attendance-${attendanceRecord?.course?._id}`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <FontAwesome name='qrcode' size={24} color="white" style={{ fontfamily: 'FontAwesome'}}/> 
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{attendanceRecord?.course?.name}</Text>
                    <Text style={styles.dateText}>{new Date(attendanceRecord?.date).toDateString()}</Text>
                </View>
                <DeleteModal title={'attendance'} handleDelete={handleDelete} isPending={isPending}/>
            </View>

            {/* Attendance List */}
            <FlatList
                data={attendance}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.attendanceCard}
                        onPress={() => isEditing && toggleAttendance(item?._id)}
                        activeOpacity={isEditing ? 0.6 : 1}
                    >
                        <View>
                            <Text style={styles.studentName}>
                                {item?.studentId?.name} 
                            </Text>
                            <Text style={styles.studentRoll}>
                                {item?.studentId?.roll_no}
                            </Text>
                        </View>
                        <Ionicons
                            name={item?.isPresent ? "checkmark-circle" : "close-circle"}
                            size={28}
                            color={item?.isPresent ? "#4CAF50" : "#F44336"}
                        />
                    </TouchableOpacity>
                )}
            />

            {/* Footer with Edit/Save button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isEditing ? "#4CAF50" : "#FFD700" }]}
                    onPress={async () => {
                        if (isEditing) {
                            await handleSaveChanges();
                        }
                        setIsEditing(!isEditing);
                    }}
                >
                    <Text style={styles.buttonText}>
                        {isEditing ? "Save Changes" : "Edit Attendance"}
                    </Text>
                </TouchableOpacity>
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
        marginBottom: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        elevation: 6,
        borderBottomWidth: 2,
        borderBottomColor: "#FFD700",
    },
    headerText: {
        color: "#FFD700",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    headerTextContainer: {
        alignItems:'center'
    },
    dateText: {
        color: "#FFD700",
        fontSize: 14,
    },
    attendanceCard: {
        backgroundColor: "#1C2541",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#FFD700",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
    },
    studentName: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    studentRoll: {
        marginTop: 2,
        color: "#FFD700",
        fontSize: 13,
    },
    footer: {
        backgroundColor: "#161B33",
        paddingVertical: 15,
        paddingBottom: 20,
        alignItems: "center",
        marginTop: "auto",
        borderTopWidth: 2,
        borderTopColor: "#FFD700",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: "#0A0F24",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AttendanceDetailsScreen;
