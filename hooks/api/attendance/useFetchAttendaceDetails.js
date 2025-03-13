import { getAttendanceDetailsRequest } from "@/apis/Attendance"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"


const useFetchAttendaceDetails = (attendanceId) => {
    const {auth} = useAuth();
    const {isFetching, error, isSuccess, data: attendanceDetails, refetch} = useQuery({
        queryFn: () => getAttendanceDetailsRequest({ token: auth?.token , attendanceId: attendanceId }),
        queryKey: [`attendance-details-${attendanceId}`],
        staleTime: 300000
    })
    return {
        isFetching, 
        error, 
        isSuccess,
        attendanceDetails, 
        refetch
    }
}

export default useFetchAttendaceDetails