import { updateCourseStudentListRequest } from "@/apis/Course"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"
import Toast from "react-native-toast-message";

const useUpdateCourseStudentList = (courseId) => {
    const { auth } = useAuth();
    const {isPending, isSuccess, error, mutateAsync: updateCourseStudentListMutation} = useMutation({
        mutationFn: (selectedStudents) => updateCourseStudentListRequest({token: auth?.token, courseId: courseId, selectedStudents: selectedStudents}),
        onSuccess : (data) => {
            console.log("Students list Updated Successfully: ", data);
            Toast.show({
                type: 'success',
                text1: 'Student list updated Successfully',
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
        isSuccess, 
        error,
        updateCourseStudentListMutation
    }
}

export default useUpdateCourseStudentList