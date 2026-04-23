import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut, User, Mail, BarChart3, Check, Palette } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import { useAppTheme, THEMES, type ThemeId } from '@/contexts/ThemeContext';

function StatRow({
  label,
  value,
  color = 'text-foreground',
}: Readonly<{ label: string; value: string | number; color?: string }>) {
  return (
    <View className="flex-row items-center justify-between py-3.5 border-b border-border">
      <Text className="text-base text-muted-foreground">{label}</Text>
      <Text className={`text-base font-semibold ${color}`}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { todos, completedCount } = useTodos();
  const { theme, themeId, setTheme } = useAppTheme();

  const completionRate =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 40 }}
      style={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pb-2 pt-4">
        <Text className="text-2xl font-bold text-foreground">Profile</Text>
        <Text className="mt-0.5 text-sm text-muted-foreground">Your account & stats</Text>
      </View>

      {/* User card */}
      <View className="mx-5 mt-5 rounded-2xl border border-border bg-card p-5">
        <View
          className="mb-4 h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: theme.primary + '22',
            borderWidth: 1,
            borderColor: theme.primary + '44',
          }}
        >
          <Text className="text-2xl font-bold" style={{ color: theme.primary }}>
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </Text>
        </View>

        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <User size={14} color="#8b8ba8" />
            <Text className="text-lg font-bold text-foreground">{user?.name ?? '—'}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Mail size={14} color="#8b8ba8" />
            <Text className="text-sm text-muted-foreground">{user?.email ?? '—'}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="mx-5 mt-5 rounded-2xl border border-border bg-card p-5">
        <View className="mb-2 flex-row items-center gap-2">
          <BarChart3 size={16} color={theme.primary} />
          <Text className="text-base font-semibold text-foreground">Statistics</Text>
        </View>

        <StatRow label="Total created" value={todos.length} />
        <StatRow label="Completed" value={completedCount} color="text-success" />
        <StatRow label="Pending" value={todos.length - completedCount} color="text-foreground-dim" />
        <View className="flex-row items-center justify-between pt-3.5">
          <Text className="text-base text-muted-foreground">Completion rate</Text>
          <Text
            className={`text-base font-semibold ${
              completionRate >= 80
                ? 'text-success'
                : completionRate >= 40
                  ? 'text-foreground-dim'
                  : 'text-muted-foreground'
            }`}
          >
            {completionRate}%
          </Text>
        </View>
      </View>

      {/* Theme picker */}
      <View className="mx-5 mt-5 rounded-2xl border border-border bg-card p-5">
        <View className="mb-4 flex-row items-center gap-2">
          <Palette size={16} color={theme.primary} />
          <Text className="text-base font-semibold text-foreground">Accent Color</Text>
        </View>

        <View className="flex-row flex-wrap gap-4">
          {(Object.values(THEMES) as (typeof THEMES)[ThemeId][]).map((t) => {
            const isSelected = themeId === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => setTheme(t.id as ThemeId)}
                activeOpacity={0.75}
                className="items-center gap-2"
              >
                <View
                  className="h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: t.primary,
                    borderWidth: isSelected ? 3 : 0,
                    borderColor: '#ffffff',
                    transform: [{ scale: isSelected ? 1.1 : 1 }],
                  }}
                >
                  {isSelected ? <Check size={16} color="#ffffff" strokeWidth={3} /> : null}
                </View>
                <Text className="text-xs text-muted-foreground">{t.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Sign out */}
      <View className="mx-5 mt-5">
        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.7}
          className="flex-row items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 py-4"
        >
          <LogOut size={18} color="#ef4444" />
          <Text className="font-semibold text-destructive">Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
