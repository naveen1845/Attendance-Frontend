import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/context/useAuth'
import { useMutation } from '@tanstack/react-query';
import { createAttendaceRequest } from '@/apis/Attendance';
import Toast from 'react-native-toast-message';

const useCreateAttendance = (courseId) => {
    const { auth } = useAuth();
    const { isPending, error, isSuccess, mutateAsync: createAttendanceMutation} = useMutation({
        mutationFn: () => createAttendaceRequest({token: auth?.token, courseId: courseId}),
        onSuccess: (data) => {
            console.log("Attendance Record Created:" , data);
            Toast.show({
                type: 'success',
                text1: 'Attrendace Record Created',
                visibilityTime: 3000,
                position: 'top',
            })
            
        },
        onError: (error) => {
            console.log('error creating attendance: ', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error?.message || 'Something went wrong',
                visibilityTime: 3000,
                position: 'top',
            })
        }
    })
    return {
        isPending, 
        error, 
        isSuccess,
        createAttendanceMutation
    }
}

export default useCreateAttendance