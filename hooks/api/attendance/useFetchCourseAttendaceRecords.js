import { getCourseAttendanceRecordsRequest } from "@/apis/Attendance"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"


const useFetchCourseAttendaceRecords = (courseId, startDate, endDate) => {
    const { auth } = useAuth();
    const {isFetching, isSuccess, error, data: courseAttendance, refetch} = useQuery({
        queryFn: () => getCourseAttendanceRecordsRequest({ token: auth?.token, courseId: courseId, startDate: startDate, endDate: endDate}),
        queryKey: [`course-Attendance-${courseId}`, startDate, endDate],
        staleTime: 30000
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