import { useState, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTodos } from '@/hooks/useTodos';
import { useAuth } from '@/hooks/useAuth';
import { TodoCard } from '@/components/TodoCard';
import { Fab } from '@/components/FAB';
import { FilterTabs } from '@/components/FilterTabs';
import { SummaryCard } from '@/components/SummaryCard';
import { AddTodoModal } from '@/components/AddTodoModal';
import { FilterType } from '@/types';

function getGreeting(name: string) {
  const hour = new Date().getHours();
  let time = 'evening';
  if (hour < 12) time = 'morning';
  else if (hour < 18) time = 'afternoon';
  return `Good ${time}, ${name} 👋`;
}

const EMPTY_MESSAGES: Record<FilterType, { emoji: string; title: string; sub: string }> = {
  all: { emoji: '📝', title: 'No todos yet', sub: 'Tap + to add your first task' },
  active: { emoji: '✅', title: 'All caught up!', sub: 'No active tasks remaining' },
  completed: { emoji: '🎯', title: 'Nothing done yet', sub: 'Complete a task to see it here' },
};

function EmptyState({ filter }: Readonly<{ filter: FilterType }>) {
  const { emoji, title, sub } = EMPTY_MESSAGES[filter];
  return (
    <View className="flex-1 items-center justify-center py-24">
      <Text style={{ fontSize: 56 }}>{emoji}</Text>
      <Text className="mt-4 text-lg font-semibold text-foreground">{title}</Text>
      <Text className="mt-1 text-sm text-muted-foreground">{sub}</Text>
    </View>
  );
}

function TodoSeparator() {
  return <View className="h-3" />;
}

export default function TodosScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { todos, addTodo, toggleTodo, deleteTodo, completedCount, pendingCount } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-5 pb-4 pt-4">
        <Text className="text-2xl font-bold text-foreground" numberOfLines={1}>
          {getGreeting(user?.name ?? 'there')}
        </Text>
        <Text className="mt-0.5 text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View className="px-5 pb-4">
        <SummaryCard
          total={todos.length}
          completed={completedCount}
          pending={pendingCount}
        />
      </View>

      <View className="px-5 pb-4">
        <FilterTabs active={filter} onChange={setFilter} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={TodoSeparator}
        ListEmptyComponent={<EmptyState filter={filter} />}
        renderItem={({ item }) => (
          <TodoCard
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Fab onPress={() => setModalVisible(true)} />

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addTodo}
      />
    </View>
  );
}
