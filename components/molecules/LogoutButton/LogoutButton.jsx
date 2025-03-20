import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/context/useAuth'

const LogoutButton = () => {
    const { logout } = useAuth();
  return (
    <View>
      <Text onPress={logout}>LogoutButton</Text>
    </View>
  )
}

export default LogoutButton