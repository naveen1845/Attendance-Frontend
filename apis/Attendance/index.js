import axios from "@/config/axiosConfig";

export const getCourseAttendanceRecordsRequest = async ({token, courseId}) => {
    try {
        const response = await axios.get('/attendance', {
            headers: {
                'x-access-token' : token
            },
            params: {
                'courseId' : courseId
            }
        })

        console.log("attendance Fetched Successfully", response?.data?.data?.data);
        return response?.data?.data?.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}