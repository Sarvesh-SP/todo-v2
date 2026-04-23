import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { CheckCircle } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          <Animated.View
            entering={FadeIn.duration(600)}
            className="mb-10 items-center"
          >
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 border border-primary/30">
              <CheckCircle size={40} color="#6366f1" strokeWidth={1.5} />
            </View>
            <Text className="text-3xl font-bold text-foreground">Welcome back</Text>
            <Text className="mt-2 text-center text-base text-muted-foreground">
              Sign in to continue your tasks
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(150).duration(500)}
            className="gap-4"
          >
            {error ? (
              <View className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
                <Text className="text-sm text-destructive">{error}</Text>
              </View>
            ) : null}

            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
            />

            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
            />

            <Button
              label="Sign In"
              onPress={handleSignIn}
              loading={loading}
              className="mt-2"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            className="mt-8 flex-row items-center justify-center gap-1"
          >
            <Text className="text-muted-foreground">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text className="font-semibold text-primary">Sign up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
