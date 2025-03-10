
import { useQuery } from '@tanstack/react-query'
import { getAllFacultyCoursesRequest } from '@/apis/Course'
import { useAuth } from '@/hooks/context/useAuth'

const useFetchAllFacultyCourses = () => {
    const { auth } = useAuth();
    const { isFetching, isSuccess, error, data: facultyCourses, refetch} = useQuery({
        queryFn: () => getAllFacultyCoursesRequest(auth?.token),
        queryKey: [`facultyCourses`],
        staleTime: 300000
    })

    return {
        isFetching,
        isSuccess,
        error,
        facultyCourses,
        refetch
    }
}

export default useFetchAllFacultyCourses