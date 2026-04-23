import { View, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { FilterType } from '@/types';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Done', value: 'completed' },
];

type FilterTabsProps = {
  active: FilterType;
  onChange: (filter: FilterType) => void;
};

export function FilterTabs({ active, onChange }: Readonly<FilterTabsProps>) {
  const { theme } = useAppTheme();

  return (
    <View className="flex-row gap-2 rounded-xl bg-surface p-1 border border-border">
      {FILTERS.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <TouchableOpacity
            key={value}
            onPress={() => onChange(value)}
            style={isActive ? { backgroundColor: theme.primary } : undefined}
            className={cn('flex-1 items-center rounded-lg py-2', !isActive && 'bg-transparent')}
            activeOpacity={0.7}
          >
            <Text
              className={cn(
                'text-sm font-semibold',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
