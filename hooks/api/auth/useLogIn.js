import { loginRequest } from "@/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks/context/useAuth";
import { useNavigation } from "@react-navigation/native";


export const useLogIn = () => {
    const navigation = useNavigation()
    const { setAuth } = useAuth();
    const { error, isPending, isSuccess, mutateAsync: loginMutation} = useMutation({
        mutationFn: ({email, password}) => loginRequest({email, password}),
        onSuccess: (response) => {
                    console.log('Successfully Logged in', response.data);

                    const userObject = JSON.stringify(response.data);

                    AsyncStorage.setItem('user', userObject);
                    AsyncStorage.setItem('token', response.data.token);

                    setAuth({
                        user: userObject,
                        token: response.data.token,
                        isLoading: false
                    })
                    
                    Toast.show({
                        type: 'success',
                        text1: 'Log In Successful',
                        visibilityTime: 3000,
                        position: 'top',
                    })
                    
                    navigation.navigate("FacultyScreen");

                },
                onError: (error) => {
                    console.log('Failed to Login', error);
        
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: error?.message || 'Something went wrong',
                        visibilityTime: 3000,
                        position: 'top',
                    })
                }
            });
    return {
        isPending,
        isSuccess,
        error,
        loginMutation
    };
}

