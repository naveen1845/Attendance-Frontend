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
        if(!auth.isLoading && (!auth.user || !auth.token)){
            Toast.show({
                type: 'error',
                text1: 'Session Over',
                text2: 'Please Login Again',
                visibilityTime: 3000,
                position: 'top',
            })
            setShouldRedirect(true);
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }
    }, [auth, navigation])

    if (auth.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // useEffect(() => {
    //     if (shouldRedirect) {
    //         navigation.reset({ index: 0, routes: [{ name: "Login" }] }); // Ensure back button doesn't take user back
    //     }
    // }, [shouldRedirect]);
    

    return children;
}