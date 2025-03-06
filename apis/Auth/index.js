import axios from "@/config/axiosConfig";

export const signUpRequest = async ({ name, email, password, role}) => {
    try {
        const response = await axios.post('/user/signup', {
            name,
            email,
            password,
            role
        })
        return response.data
    } catch (error) {
        console.log(error?.response?.data || error?.message);
        throw error?.response?.data;
    }
}

export const loginRequest = async ({ email, password}) => {
    try {
        const response = await axios.post('/user/signin', {
            email,
            password
        })
        return response.data
    } catch (error) {
        console.log(error?.response?.data || error?.message);
        throw error?.response?.data;
    }
}