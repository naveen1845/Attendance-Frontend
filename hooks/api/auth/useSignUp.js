import { signUpRequest } from '@/apis/Auth';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useSignUp = () => {
    const { isPending, isSuccess, error, mutateAsync: signupMutation} = useMutation({
        mutationFn: ({name, email, password}) => signUpRequest({name, email, password, role: 'faculty'}),
        onSuccess: (data) => {
            console.log('Scuccessfuilly signed up', data);
            Toast.show({
                type: 'success',
                text1: 'Signup Successful',
                visibilityTime: 3000,
                position: 'top',
            })
        },
        onError: (error) => {
            console.log('Failed to sign up', error);

            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
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
        signupMutation
    };
}
