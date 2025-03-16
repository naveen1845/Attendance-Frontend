import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

const FilterModal = ({ onApplyFilter, onResetFilter}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2025-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);


  return (
    <>
      {/* Button to open modal */}
      <TouchableOpacity style={styles.filterbtn} onPress={() => setModalVisible(true)}>
        <FontAwesome name="filter"  size={24} color="white" style={{ fontfamily: 'FontAwesome'}}/>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Date Range</Text>

            {/* Start Date Picker */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}

            {/* End Date Picker */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateText}>End Date: {endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={onResetFilter}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => {
                  onApplyFilter(startDate, endDate.setHours(23,59,59,59));
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161B33",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: "#161B33",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
  },
  dateButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#FFD700",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161B33",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    },
    applyButton: {
    backgroundColor: "#28a745",
  },
  closeButton: {
    backgroundColor: "#dc3545",
  },
  resetButton: {
    backgroundColor: "#FFA500",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
});

export default FilterModal;
