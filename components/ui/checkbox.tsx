import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  className?: string;
};

export function Checkbox({ checked, onPress, className }: Readonly<CheckboxProps>) {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress} hitSlop={8} activeOpacity={0.7}>
      <View
        style={checked ? { backgroundColor: theme.primary, borderColor: theme.primary } : undefined}
        className={cn(
          'h-5 w-5 items-center justify-center rounded-full border-2',
          checked ? 'border-primary' : 'border-muted bg-transparent',
          className,
        )}
      >
        {checked ? <Check size={11} color="#ffffff" strokeWidth={3} /> : null}
      </View>
    </TouchableOpacity>
  );
}
