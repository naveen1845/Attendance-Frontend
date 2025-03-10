import { createCourseRequest } from "@/apis/Course"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"
import Toast from "react-native-toast-message";


const useCreateCourse = () => {
    const { auth } = useAuth();
    const {isSuccess, error, isPending, mutateAsync: createCourseMutation} = useMutation({
        mutationFn: ({ name }) => createCourseRequest({ token: auth?.token, courseName: name }),
        onSuccess: (data) => {
            console.log("Course Created Successfully: ", data);
            Toast.show({
                type: 'success',
                text1: 'Course Created',
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
        isSuccess, 
        error, 
        isPending, 
        createCourseMutation
    }
}

export default useCreateCourse