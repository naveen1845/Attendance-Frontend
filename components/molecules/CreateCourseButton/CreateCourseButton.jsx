import useCreateCourse from "@/hooks/api/courses/useCreateCourse";
import { dataTagErrorSymbol, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CreateCourseButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const { createCourseMutation, isPending } = useCreateCourse();
  const queryClient = useQueryClient();

  const handleCreate = async () => {
    try {
      if (courseName.trim()) {
        await createCourseMutation({ name: courseName.trim() });
        queryClient.invalidateQueries(`facultyCourses`);
      }
    } catch (error) {
      console.log("error creating course (from modal): ", dataTagErrorSymbol);
      
    }finally{
      setModalVisible(false);
      setCourseName("");
    }
  };

  return (
    <View>
      {/* Button to Open Dialog */}
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Create Course</Text>
      </TouchableOpacity>

      {/* Dialog Box */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>CREATE COURSE</Text>

            {/* Input Field */}
            <TextInput
              style={styles.input}
              placeholder="Course Name"
              placeholderTextColor={'#888'}
              value={courseName}
              onChangeText={setCourseName}
              disableFullscreenUI={isPending}
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={isPending} style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={isPending} style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.buttonText}>create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    createButton: {
      backgroundColor: "#FFD700", // Gold accent for premium feel
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 10,
      elevation: 4, // Adding depth effect
      shadowColor: "#FFD700",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    buttonText: {
      color: "#0A0F24", // Deep dark blue for contrast
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    cancelText: {
      color: "#FF3B30", 
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(10, 15, 36, 0.8)",
    },
    modalContent: {
      width: 320,
      backgroundColor: "#161B33", // Darker shade for contrast
      padding: 20,
      borderRadius: 12,
      alignItems: "center",
      elevation: 6,
      shadowColor: "#FFD700",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      borderWidth: 2,
      borderColor: "#FFD700", // Gold neon border
    },
    modalTitle: {
      fontSize: 20,
      color: "#FFD700",
      fontWeight: "bold",
      marginBottom: 12,
      textTransform: "uppercase",
    },
    input: {
      width: "100%",
      borderWidth: 1.5,
      borderColor: "#FFD700",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      color: "#FFD700",
      backgroundColor: "#1C2541", // Dark blue input field
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 8,
      width: "100%",
      justifyContent: "flex-end",
    },
    cancelButton: {
      padding: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#FF3B30",
      borderRadius: 8,
      marginVertical: 10,
    },
    createButtonSmall: {
      backgroundColor: "#FFD700",
      padding: 10,
      borderRadius: 8,
      flex: 1,
      alignItems: "center",
    },
});

export default CreateCourseButton;
