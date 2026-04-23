import { TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

type FabProps = {
  onPress: () => void;
  className?: string;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Fab({ onPress, className }: Readonly<FabProps>) {
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[animatedStyle, { backgroundColor: theme.primary }]}
      className={cn(
        'absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full shadow-lg',
        className,
      )}
    >
      <Plus size={26} color="#ffffff" strokeWidth={2.5} />
    </AnimatedTouchable>
  );
}
