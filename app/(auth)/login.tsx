import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Welcome back to APEX</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.buttonText}>Log In (Dev Bypass)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 24 }}>
        <Text style={{ textAlign: 'center', color: '#6B717E' }}>Back to Welcome</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E7',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#16181D',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B717E',
    marginTop: 8,
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#16181D',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
