import axios from "@/config/axiosConfig";

export const getAllStudentsRequest = async ({token}) => {
    try {
        const response = await axios.get('/user/students', {
            headers:{
                'x-access-token': token
            }
        })

        console.log("axios fetch all studenst request:", response?.data?.data );
        return response?.data?.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}