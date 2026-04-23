import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { X, Calendar, ChevronRight } from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppTheme } from '@/contexts/ThemeContext';

type AddTodoModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, dueDate?: string) => void;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function AddTodoModal({ visible, onClose, onAdd }: Readonly<AddTodoModalProps>) {
  const { theme } = useAppTheme();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selected) setDueDate(selected);
    } else {
      if (selected) setDueDate(selected);
    }
  };

  const handleAdd = () => {
    if (!title.trim()) {
      setError('Todo title is required');
      return;
    }
    onAdd(title.trim(), dueDate?.toISOString());
    reset();
    onClose();
  };

  const reset = () => {
    setTitle('');
    setDueDate(null);
    setShowPicker(false);
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const clearDate = () => {
    setDueDate(null);
    setShowPicker(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-end bg-black/60">
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback>
              <View className="rounded-t-3xl border-t border-border bg-surface p-6 pb-10">
                <View className="mb-6 flex-row items-center justify-between">
                  <Text className="text-xl font-bold text-foreground">New Todo</Text>
                  <TouchableOpacity
                    onPress={handleClose}
                    className="rounded-full bg-card p-2"
                    hitSlop={8}
                  >
                    <X size={18} color="#8b8ba8" />
                  </TouchableOpacity>
                </View>

                <View className="gap-4">
                  <Input
                    label="What needs to be done?"
                    placeholder="e.g. Buy groceries"
                    value={title}
                    onChangeText={(t) => {
                      setTitle(t);
                      if (error) setError('');
                    }}
                    error={error}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={handleAdd}
                  />

                  {/* Due date row */}
                  <View className="gap-1.5">
                    <Text className="text-sm font-medium text-foreground-dim">
                      Due date (optional)
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowPicker((p) => !p)}
                      activeOpacity={0.7}
                      className="flex-row items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5"
                      style={showPicker ? { borderColor: theme.primary } : undefined}
                    >
                      <View className="flex-row items-center gap-2">
                        <Calendar size={16} color={dueDate ? theme.primary : '#8b8ba8'} />
                        <Text
                          className={
                            dueDate ? 'text-base text-foreground' : 'text-base text-muted-foreground'
                          }
                        >
                          {dueDate ? formatDate(dueDate) : 'Pick a date'}
                        </Text>
                      </View>
                      {dueDate ? (
                        <TouchableOpacity onPress={clearDate} hitSlop={8}>
                          <X size={15} color="#8b8ba8" />
                        </TouchableOpacity>
                      ) : (
                        <ChevronRight size={16} color="#8b8ba8" />
                      )}
                    </TouchableOpacity>

                    {/* iOS inline spinner */}
                    {Platform.OS === 'ios' && showPicker && (
                      <View className="overflow-hidden rounded-xl border border-border bg-card">
                        <DateTimePicker
                          value={dueDate ?? new Date()}
                          mode="date"
                          display="spinner"
                          minimumDate={new Date()}
                          onChange={handleDateChange}
                          themeVariant="dark"
                          style={{ height: 160 }}
                        />
                        <TouchableOpacity
                          onPress={() => setShowPicker(false)}
                          className="items-center border-t border-border py-3"
                          style={{ backgroundColor: theme.primary + '18' }}
                        >
                          <Text className="font-semibold" style={{ color: theme.primary }}>
                            Done
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {/* Android native dialog */}
                  {Platform.OS === 'android' && showPicker && (
                    <DateTimePicker
                      value={dueDate ?? new Date()}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={handleDateChange}
                    />
                  )}

                  <Button label="Add Todo" onPress={handleAdd} className="mt-2" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
