import { getAllStudentsRequest } from "@/apis/User"
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

const useFetchAllStudents = () => {
    const {auth} = useAuth();
    const { isFetching, isSuccess, error, data: allStudents} = useQuery({
        queryFn: () => getAllStudentsRequest({token: auth?.token}),
        queryKey: ['all-students'],
        staleTime: 300000
    })

    return {
        isFetching, 
        isSuccess, 
        error,
        allStudents
    }
}

export default useFetchAllStudents