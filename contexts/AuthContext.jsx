import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [ auth, setAuth ] = useState({
        user: null,
        token: null,
        isLoading: true
    });

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const user = await AsyncStorage.getItem('user'); 
                const token = await AsyncStorage.getItem('token');
    
                if (user && token) {
                    setAuth({
                        user: JSON.parse(user),
                        token,
                        isLoading: false
                    });
                } else {
                    setAuth({
                        user: null,
                        token: null,
                        isLoading: false
                    });
                }
            } catch (error) {
                console.error("Error loading auth data:", error);
                setAuth({ user: null, token: null, isLoading: false });
            }
        };
    
        loadAuthData();
    }, []);
    

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;