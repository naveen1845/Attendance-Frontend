
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

export const getAttendanceDetailsRequest = async ({token, attendanceId}) => {
    try {
        const response = await axios.get(`/attendance/${attendanceId}`, {
            headers: {
                'x-access-token' : token
            }
        })

        console.log('attendance detils axios: ', response?.data?.data?.data);

        return response?.data?.data?.data;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const updateAttendanceRequest = async ({token, attendanceId, studentsAttendance}) => {
    try {
        const response = axios.post(`/attendance/${attendanceId}`, {studentsAttendance: studentsAttendance}, {
            headers: {
                'x-access-token': token
            }
        })
        console.log("attendance updated axios ", response?.data?.data?.data);

        return response?.data?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createAttendaceRequest = async ({token, courseId}) => {
    try {
        const response = axios.post('/attendance/create', {courseId: courseId}, {
            headers: {
                'x-access-token': token
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
}