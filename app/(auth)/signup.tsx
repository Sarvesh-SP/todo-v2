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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setLoading(true);
    const result = await signUp(name, email, password, confirmPassword);
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
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-3xl bg-secondary/20 border border-secondary/30">
              <CheckCircle size={40} color="#7c3aed" strokeWidth={1.5} />
            </View>
            <Text className="text-3xl font-bold text-foreground">Create account</Text>
            <Text className="mt-2 text-center text-base text-muted-foreground">
              Start organizing your life today
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
              label="Full name"
              placeholder="Alex Johnson"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />

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
              placeholder="Min. 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
            />

            <Input
              label="Confirm password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />

            <Button
              label="Create Account"
              variant="secondary"
              onPress={handleSignUp}
              loading={loading}
              className="mt-2"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            className="mt-8 flex-row items-center justify-center gap-1"
          >
            <Text className="text-muted-foreground">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-semibold text-primary">Sign in</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
