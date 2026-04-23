import { View, Text } from 'react-native';

type SummaryCardProps = {
  total: number;
  completed: number;
  pending: number;
};

function StatPill({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <View className="flex-1 items-center rounded-xl bg-card px-3 py-3 border border-border">
      <Text className={`text-2xl font-bold ${colorClass}`}>{value}</Text>
      <Text className="mt-0.5 text-xs text-muted-foreground">{label}</Text>
    </View>
  );
}

export function SummaryCard({ total, completed, pending }: SummaryCardProps) {
  return (
    <View className="flex-row gap-3">
      <StatPill label="Total" value={total} colorClass="text-foreground" />
      <StatPill label="Done" value={completed} colorClass="text-success" />
      <StatPill label="Pending" value={pending} colorClass="text-primary" />
    </View>
  );
}
