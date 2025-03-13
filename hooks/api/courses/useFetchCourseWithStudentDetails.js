import { getCourseWithStudentsDetailsRequest } from "@/apis/Course"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

const useFetchCourseWithStudentDetails = (courseId) => {
    const { auth } = useAuth();
    const {isFetching, isSuccess, error, data: courseDetails, refetch} = useQuery({
        queryFn: () => getCourseWithStudentsDetailsRequest({token: auth?.token, courseId: courseId}),
        queryKey: [`course-with-student-details-${courseId}`],
        staleTime: 3000000
    })

    return {
        isFetching, 
        isSuccess, 
        error,
        courseDetails, 
        refetch
    }
}

export default useFetchCourseWithStudentDetails;