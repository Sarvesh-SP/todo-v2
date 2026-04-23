import { View, Text, TouchableOpacity } from 'react-native';
import { Trash2, Calendar } from 'lucide-react-native';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';

type TodoCardProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

export function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  return (
    <View
      className={cn(
        'flex-row items-center gap-3 rounded-xl border border-border bg-card p-4',
        todo.completed && 'opacity-60',
      )}
    >
      <Checkbox
        checked={todo.completed}
        onPress={() => onToggle(todo.id)}
      />

      <View className="flex-1 gap-1">
        <Text
          className={cn(
            'text-base font-medium text-foreground',
            todo.completed && 'line-through text-muted-foreground',
          )}
          numberOfLines={2}
        >
          {todo.title}
        </Text>
        {todo.dueDate ? (
          <View className="flex-row items-center gap-1">
            <Calendar size={11} color="#8b8ba8" />
            <Text className="text-xs text-muted-foreground">
              {formatDate(todo.dueDate)}
            </Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => onDelete(todo.id)}
        hitSlop={8}
        activeOpacity={0.7}
        className="rounded-lg p-1.5"
      >
        <Trash2 size={16} color="#8b8ba8" />
      </TouchableOpacity>
    </View>
  );
}
