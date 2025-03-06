import { useAuth } from "@/hooks/context/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const ProtectedScreens = ({children}) => {

    const navigation = useNavigation();
    const { auth } = useAuth();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if(!auth.isLoading && (!auth.user && !auth.token)){
            Toast.show({
                type: 'error',
                text1: 'Session Over',
                text2: 'Please Login Again',
                visibilityTime: 3000,
                position: 'top',
            })

            setShouldRedirect(true);
        }
    }, [])

    if (auth.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (shouldRedirect) {
        navigation.navigate("Login");
    }

    return children;
}