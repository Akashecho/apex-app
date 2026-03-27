import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  // In a real app, we'd check auth state here
  // For now, redirect to auth
  const isReady = true;
  const isAuthenticated = false;

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F1E7' }}>
        <ActivityIndicator size="large" color="#E3173E" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)/welcome"} />;
}
