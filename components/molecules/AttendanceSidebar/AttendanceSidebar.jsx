import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import FilterModal from '../FilterAttendanceModal/FilterAttendanceModal';
import GenerateAttendanceReport from '../GenerateReports/GenerateAttendanceReport';
import GenerateStudentAttendanceList from '../GenerateReports/GenerateStudentAttendanceList';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '../DeleteModal/DeleteModal';

const { width } = Dimensions.get('window');

const Sidebar = ({ isVisible, onClose, courseAttendance }) => {
    const [filterVisibility, setFilterVisibility] = useState(false);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
    const navigation = useNavigation();
  
    const translateX = useSharedValue(isVisible ? 0 : width); // Start offscreen
  
    useEffect(() => {
      translateX.value = withTiming(isVisible ? 0 : width, { duration: 300 });
    }, [isVisible]);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const onAnalyticsPress = () => {
      navigation.navigate('AnalyticsScreen', {data: courseAttendance})
    }

    const handleDelete = async () => {

    }
    
  
    return (
      <Animated.View style={[styles.sidebar, animatedStyle]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name='times' size={24} color='white' />
        </TouchableOpacity>
  
        <Text style={styles.sidebarTitle}>Options</Text>
  
  
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setShowDownloadOptions(!showDownloadOptions);
          }}
        >
          <Text style={styles.optionText}>Reports</Text>
        </TouchableOpacity>
  
        {showDownloadOptions && (
          <>
            <GenerateAttendanceReport attendanceRecords={courseAttendance} />
            <GenerateStudentAttendanceList attendanceRecords={courseAttendance} />
          </>
        )}
  
  
        <TouchableOpacity style={styles.option} onPress={onAnalyticsPress}>
          <Text style={styles.optionText}>Analytics</Text>
        </TouchableOpacity>

        <View style={{...styles.option, marginTop: "auto", marginBottom: 22}}><DeleteModal title={'course'} handleDelete={handleDelete}><Text style={styles.optionText}>Delete Course</Text></DeleteModal></View>
      </Animated.View>
    );
  };
  

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#161B33',
    padding: 20,
    elevation: 10,
    borderLeftWidth: 2,
    borderColor: '#FFD700',
    zIndex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  sidebarTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Sidebar;
