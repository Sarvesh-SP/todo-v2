import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-xl px-6 py-4 active:opacity-80',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        outline: 'border border-border bg-transparent',
        ghost: 'bg-transparent',
        destructive: 'bg-destructive',
      },
      size: {
        default: 'py-4 px-6',
        sm: 'py-2.5 px-4',
        lg: 'py-5 px-8',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const textVariants = cva('font-semibold text-base', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-primary-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      destructive: 'text-primary-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    label: string;
    loading?: boolean;
    className?: string;
    textClassName?: string;
  };

export function Button({
  label,
  variant,
  size,
  loading,
  className,
  textClassName,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useAppTheme();

  let dynStyle: { backgroundColor?: string } = {};
  if (variant === 'secondary') dynStyle = { backgroundColor: theme.secondary };
  else if (variant === 'default' || variant == null) dynStyle = { backgroundColor: theme.primary };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      style={[dynStyle, style as object]}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost' ? '#f0f0ff' : '#fff'
          }
        />
      ) : (
        <Text className={cn(textVariants({ variant }), textClassName)}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
