import { View, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckSquare, User } from 'lucide-react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const TAB_CONFIG = [
  { name: 'index', label: 'Todos', Icon: CheckSquare },
  { name: 'profile', label: 'Profile', Icon: User },
];

function CustomTabBar({ state, navigation }: Readonly<BottomTabBarProps>) {
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();

  return (
    <View
      className="flex-row border-t border-border bg-surface px-6 pt-3"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {state.routes
        .filter((r) => TAB_CONFIG.some((t) => t.name === r.name))
        .map((route) => {
          const tab = TAB_CONFIG.find((t) => t.name === route.name);
          if (!tab) return null;
          const isFocused = state.index === state.routes.indexOf(route);
          const { Icon } = tab;

          return (
            <TouchableOpacity
              key={route.key}
              className="flex-1 items-center gap-1"
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <Icon size={22} color={isFocused ? theme.primary : '#8b8ba8'} />
              <Text
                style={isFocused ? { color: theme.primary } : undefined}
                className={cn(
                  'text-xs font-semibold',
                  !isFocused && 'text-muted-foreground',
                )}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const tabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={tabBar}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
