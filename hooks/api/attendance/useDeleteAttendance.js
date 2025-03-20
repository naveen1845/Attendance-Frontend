import { deleteAttendanceRequest } from "@/apis/Attendance"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"
import Toast from "react-native-toast-message";

const useDeleteAttendance = ( attendanceId ) => {
    const {auth} = useAuth();
    const {isPending, isSuccess, error, mutateAsync: deleteAttendanceMutation} = useMutation({
        mutationFn: () => deleteAttendanceRequest({ token: auth?.token, attendanceId}),
        onSuccess: (data) => {
            console.log(data);
            Toast.show({
                type: 'success',
                text1: 'Attendance Deleted',
                visibilityTime: 3000,
                position: 'top',
            })
        },
        onError: (error) => {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Delete Failed',
                text2: error?.message || 'Something went wrong',
                visibilityTime: 3000,
                position: 'top',
            })
        }
    })
    return {
        isPending, 
        isSuccess, 
        error,
        deleteAttendanceMutation
    }
}

export default useDeleteAttendance