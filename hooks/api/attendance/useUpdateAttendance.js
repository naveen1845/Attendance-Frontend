import { useAuth } from '@/hooks/context/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateAttendanceRequest } from '@/apis/Attendance';
import Toast from 'react-native-toast-message';

const useUpdateAttendance = (attendanceId) => {
    const {auth} = useAuth();
    const {isPending, error, isSuccess, mutateAsync: updateAttendanceMutation} = useMutation({
        mutationFn: (studentsAttendance) => updateAttendanceRequest({token: auth?.token, attendanceId: attendanceId, studentsAttendance: studentsAttendance}),
        onSuccess: (data) => {
            console.log(data);
            
             Toast.show({
                type: 'success',
                text1: 'Updated Successfully',
                visibilityTime: 3000,
                position: 'top',
            })
        },
        onError: (error) => {
            console.log(error);
            
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
        updateAttendanceMutation
    }
}

export default useUpdateAttendance