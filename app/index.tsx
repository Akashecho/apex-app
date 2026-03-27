import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuthContext } from '../src/providers/AuthProvider';

export default function Index() {
  const { user, isLoading, userData } = useAuthContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F1E7' }}>
        <ActivityIndicator size="large" color="#E3173E" />
      </View>
    );
  }

  // Route based on auth state and membership status
  if (user) {
    if (userData?.membershipStatus === 'active') {
      return <Redirect href="/(tabs)" />;
    } else {
      // Direct to waiting/applied screen or onboarding
      return <Redirect href="/(auth)/apply" />;
    }
  }

  return <Redirect href="/(auth)/welcome" />;
}
