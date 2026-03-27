import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FDE1C3', '#F9C9B0', '#D9C0F0']}
        style={styles.hero}
      >
        <Text style={styles.logo}>APEX</Text>
        <Text style={styles.tagline}>The invite-only merit network for top students</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.push('/(auth)/apply')}>
          <Text style={styles.applyText}>Apply for Admission</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E7',
  },
  hero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    color: '#16181D',
    marginBottom: 16,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '500',
    color: '#16181D',
    textAlign: 'center',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    gap: 16,
  },
  applyButton: {
    backgroundColor: '#E3173E',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'rgba(227, 23, 62, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(12, 16, 28, 0.12)',
  },
  loginText: {
    color: '#16181D',
    fontSize: 18,
    fontWeight: '600',
  },
});
