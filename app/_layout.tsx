import '../global.css';
import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('@user').then((data) => {
      if (data) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0a0a0f' }}>
        <StatusBar style="light" backgroundColor="#0a0a0f" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0a0a0f' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
