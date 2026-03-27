import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>More</Text>
      <Text style={styles.subtitle}>Settings, subscription, and help</Text>
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
  },
});
