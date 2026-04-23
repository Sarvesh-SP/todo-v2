import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <View className="gap-1.5">
      {label ? (
        <Text className="text-sm font-medium text-foreground-dim">{label}</Text>
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor="#8b8ba8"
        className={cn(
          'rounded-xl border border-border bg-card px-4 py-3.5 text-base text-foreground',
          error && 'border-destructive',
          className,
        )}
      />
      {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
    </View>
  );
}
