import axios from "@/config/axiosConfig";

export const getAllFacultyCoursesRequest = async ( token) => {
    try {
        const response = await axios.get('/course', {
            headers: {
                'x-access-token' : token
            }
        })
        console.log("All faculty courses :", response?.data?.data?.data);
        
        return response?.data?.data?.data
    } catch (error) {
        console.log(error);
        throw error ;
    }
}

export const createCourseRequest = async ({ token, courseName}) => {
    try {
        const response = await axios.post('/course', { name: courseName }, {
            headers : {
                'x-access-token' : token
            }
        })

        console.log("Course Created: ", response.data.data.data);

        return response?.data?.data?.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCourseWithStudentsDetailsRequest = async ({token, courseId}) => {
    try {
        const response = await axios.get(`/course/${courseId}`, {
            headers : {
                'x-access-token' : token
            }
        })

        console.log("Course detailes fetched: ", response.data.data.data);

        return response?.data?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCourseStudentListRequest = async ({token, courseId, selectedStudents}) => {
    try {
        const response = await axios.post('/course/updateStudents', { courseId, studentsIds: selectedStudents }, {
            headers : {
                'x-access-token' : token
            }
        })

        console.log("Course Created: ", response.data.data.data);

        return response?.data?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}