import { Tabs } from 'expo-router';
import { Home, Users, CheckCircle, BookOpen, Menu } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(248, 241, 231, 0.95)',
          borderTopColor: 'rgba(12, 16, 28, 0.06)',
          elevation: 0,
        },
        tabBarActiveTintColor: '#16181D',
        tabBarInactiveTintColor: '#6B717E',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Intel',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          title: 'Match',
          tabBarIcon: ({ color }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="passport"
        options={{
          title: 'Passport',
          tabBarIcon: ({ color }) => <CheckCircle color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Menu color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
