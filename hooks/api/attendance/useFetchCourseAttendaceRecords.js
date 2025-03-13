import { getCourseAttendanceRecordsRequest } from "@/apis/Attendance"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"


const useFetchCourseAttendaceRecords = (courseId) => {
    const { auth } = useAuth();
    const {isFetching, isSuccess, error, data: courseAttendance, refetch} = useQuery({
        queryFn: () => getCourseAttendanceRecordsRequest({ token: auth?.token, courseId: courseId}),
        queryKey: [`course-Attendance-${courseId}`],
        staleTime: 300000
    })

    return {
        isFetching, 
        isSuccess, 
        error,
        refetch,
        courseAttendance
    }
}

export default useFetchCourseAttendaceRecords