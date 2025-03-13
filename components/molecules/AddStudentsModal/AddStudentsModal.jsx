import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox";
import useFetchAllStudents from "@/hooks/api/user/useFetchAllStudents";
import useUpdateCourseStudentList from "@/hooks/api/courses/useUpdateCourseStudentList";
import { useQueryClient } from "@tanstack/react-query";

const AddStudentsModal = ({ courseId, existingStudents, onStudentsUpdated }) => {
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [search, setSearch] = useState("");
  const { isSuccess, allStudents} = useFetchAllStudents();
  const queryclient = useQueryClient();
  const { isPending, isSuccess: isUpdateSuccess, error, updateCourseStudentListMutation} = useUpdateCourseStudentList(courseId);

  useEffect(() => {
    console.log(isSuccess);
    console.log(allStudents);
    console.log(existingStudents);
    
    try {
      if(isSuccess){
        setStudents(allStudents);
        setSelectedStudents(existingStudents?.length ? existingStudents.map((s) => s._id) : []);
      }
    } catch (error) {
      console.log("error in useEffect", error);
      
    }
    
    
  }, [isSuccess, existingStudents]);

  useEffect(() => {
    console.log("Updated students:", students);
    console.log("Updated selectedStudents:", selectedStudents);
  }, [students, selectedStudents]);
  

  console.log("outside students", students);
  console.log("oustide selectedStudents", typeof selectedStudents);
  

  const handleToggleStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId) // Remove if unchecked
        : [...prev, studentId] // Add if checked
    );
  };

  const handleUpdateStudents = async () => {
    try {
      await updateCourseStudentListMutation(selectedStudents);
      queryclient.invalidateQueries(`course-with-student-details-${courseId}`);
    } catch (error) {
      console.log("error Updating List (from modal): ", error);
    }finally{
      setVisible(false);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.manageButton} onPress={() => setVisible(true)}>
        <Text style={styles.manageButtonText}>Manage students</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Students</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#A9A9A9"
            />
            <FlatList
              data={students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.studentItem} onPress={() => handleToggleStudent(item._id)}>
                  <CheckBox
                    value={selectedStudents.includes(item._id)}
                  />
                  <Text style={styles.studentName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Save Changes" onPress={handleUpdateStudents} color="#007AFF" />
            <Button title="Close" onPress={() => setVisible(false)} color="#FF3B30" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  studentName: {
    marginLeft: 10,
    fontSize: 16,
  },
  manageButton: {
      borderColor: "#007AFF",  // Use your theme's primary color
      paddingVertical: 12,
      borderWidth: 1,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
    manageButtonText: {
      color: "#fff",  // White text
      fontSize: 16,
      fontWeight: "bold",
      textTransform: 'uppercase'
  }
});

export default AddStudentsModal;
