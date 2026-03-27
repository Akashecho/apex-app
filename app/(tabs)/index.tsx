import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IntelScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home / Intel</Text>
      <Text style={styles.subtitle}>Your daily command center</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Mission</Text>
        <Text style={styles.cardText}>Check in with your pod</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E7',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#16181D',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B717E',
    marginTop: 4,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: 'rgba(15, 23, 42, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B717E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16181D',
    marginTop: 8,
  },
});
