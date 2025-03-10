import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const CourseScreen = () => {
    const route = useRoute();
    
    const { courseId } = route.params;
    
    return (
        <View>
        <Text>{`course ${courseId}`}</Text>
        </View>
    )
}

export default CourseScreen;