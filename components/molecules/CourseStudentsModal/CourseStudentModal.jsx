import useFetchCourseWithStudentDetails from "@/hooks/api/courses/useFetchCourseWithStudentDetails";
import React, { useState } from "react";
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AddStudentsModal from "../AddStudentsModal/AddStudentsModal";

const CourseStudentsModal = ({ courseId, students }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ refreshing, setRefreshing ] = useState(false);

    const { isFetching, isSuccess, error, courseDetails, refetch} = useFetchCourseWithStudentDetails(courseId);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <>
            {/* Button to Open Modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <FontAwesome name="users" size={24} style={styles.iconButton}/>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                style={styles.modalContainer}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Students in Course</Text>

                        {isFetching && refreshing && <View style={{ flex: 1,marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                        <Text>Loading...</Text>
                        </View>}

                        {/* Student List */}
                        {isSuccess && !refreshing && (
                            courseDetails?.students?.length === 0 ? (
                                <Text style={styles.noStudentsText}>No students in this course</Text>
                            ) : (
                                <FlatList
                                    data={courseDetails?.students}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.studentItem}>
                                            <Text style={styles.studentName}>{item.name}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.studentEmail}>{item.roll_no} | </Text>
                                                <Text style={styles.studentEmail}>{item.email}</Text>
                                            </View>
                                        </View>
                                    )}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                />
                            )
                        )}

                        
                        <AddStudentsModal existingStudents={courseDetails?.students} courseId={courseId}/>

                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.closeBtnText}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        color: "#FFD700",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "95%",
        backgroundColor: "#161B33",  // Darker background for contrast
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        flexShrink: 1,
        maxHeight: "90%",  // Prevents modal overflow
        borderWidth: 1.5,
        borderColor: '#FFD700',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#FFD700",
    },
    studentListContainer: {
        flexGrow: 1, // Enables scrolling
        paddingBottom: 10,
    },
    studentItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#FFD700",
    },
    studentName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFD700",
    },
    studentEmail: {
        fontSize: 14,
        color: "white",
    },
    closeBtn: {
        padding: 12,
        alignItems: "center",
        borderWidth: 0,
        borderColor: "#FF3B30",
        borderRadius: 8,
    },
    closeBtnText: {
        color: "#FF3B30", 
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    noStudentsText:{
        color: "#ffff",
        textAlign: 'center',
        paddingVertical: 30,
    }
});


export default CourseStudentsModal;
