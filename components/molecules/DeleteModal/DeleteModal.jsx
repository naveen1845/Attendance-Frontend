
import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const DeleteModal = ({ handleDelete, isPending, title, children}) => {

    const [modalVisible, setModalVisible] = useState(false);
    

    
  return (
    <View>
          {/* Button to Open Dialog */}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <FontAwesome name='trash' size={24} color="#F44336" style={{ fontfamily: 'FontAwesome'}}/>
            {children}
          </TouchableOpacity>
    
          {/* Dialog Box */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>delete {title}</Text>
                <Text style={styles.modalDesc}>Are you sure you want to proceed? This action is irreversible and will permanently delete the corresponding {title} data.</Text>
    
    
                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity disabled={isPending} style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelText}>cancel</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity disabled={isPending} style={styles.createButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
    </View>
  )
}

export default DeleteModal

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
    button: {
      flexDirection : "row",
      gap: 6
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
    modalDesc: {
      fontSize: 12,
      color: "#ffff",
      marginBottom: 20,
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