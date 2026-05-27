import { useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import type { MarketplaceMessage } from "@/lib/types";
import { MarketplaceMessageThread, Screen, ThemedText } from "@/components/ui";
import { getMockCurrentUser, getMockMarketplaceMessagesByListingId } from "@/mocks";

export default function MarketplaceMessageThreadScreen() {
  const params = useLocalSearchParams<{ listingId?: string }>();
  const listingId = params.listingId ?? "";
  const baseMessages = useMemo(() => getMockMarketplaceMessagesByListingId(listingId), [listingId]);
  const [localMessages, setLocalMessages] = useState<MarketplaceMessage[]>([]);
  const [draftMessage, setDraftMessage] = useState("");
  const currentUser = getMockCurrentUser();

  const messages = [...baseMessages, ...localMessages];

  const handleSendMessage = () => {
    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage) {
      return;
    }

    const localMessage: MarketplaceMessage = {
      id: `message-local-${Date.now()}`,
      listingId,
      senderId: currentUser.id,
      senderDisplayName: currentUser.displayName,
      body: trimmedMessage,
      sentAtIso: new Date().toISOString(),
    };

    setLocalMessages((currentMessages) => [...currentMessages, localMessage]);
    setDraftMessage("");
  };

  return (
    <Screen spaced>
      <ThemedText size="xl" weight="semibold">
        Message seller
      </ThemedText>
      <MarketplaceMessageThread
        messages={messages}
        draftMessage={draftMessage}
        onDraftMessageChange={setDraftMessage}
        onSendMessage={handleSendMessage}
      />
    </Screen>
  );
}
