import { ScrollView, View, type ViewProps } from "react-native";

import type { MarketplaceMessage } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";

export interface MarketplaceMessageThreadProps extends ViewProps {
  messages: MarketplaceMessage[];
  draftMessage: string;
  onDraftMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export function MarketplaceMessageThread({
  messages,
  draftMessage,
  onDraftMessageChange,
  onSendMessage,
  className,
  ...props
}: MarketplaceMessageThreadProps & { className?: string }) {
  return (
    <View className={["flex-1 gap-space-3", className ?? ""].join(" ").trim()} {...props}>
      <ScrollView className="flex-1" contentContainerClassName="gap-space-2 pb-space-4">
        {messages.map((message) => (
          <Card key={message.id} padding="sm" className="gap-space-1">
            <ThemedText size="sm" weight="semibold">
              {message.senderDisplayName}
            </ThemedText>
            <ThemedText size="sm" tone="muted">
              {message.body}
            </ThemedText>
          </Card>
        ))}
      </ScrollView>
      <Input label="Message" value={draftMessage} onChangeText={onDraftMessageChange} />
      <Button label="Send" onPress={onSendMessage} disabled={draftMessage.trim().length === 0} />
    </View>
  );
}
