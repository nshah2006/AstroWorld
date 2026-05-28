import { Tabs } from "expo-router";

import { TabIcon } from "@/components/ui";
import { redLightColors, semanticColors, useThemeMode } from "@/theme";

export default function TabLayout() {
  const { isRedLightMode } = useThemeMode();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isRedLightMode ? redLightColors.bg : "black",
          borderTopColor: isRedLightMode ? redLightColors.border : semanticColors.border,
        },
        tabBarActiveTintColor: isRedLightMode ? redLightColors.accent : semanticColors["accent-teal"],
        tabBarInactiveTintColor: isRedLightMode ? redLightColors.muted : semanticColors.muted,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="starmap"
        options={{
          title: "Starmap",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} emphasized />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="community/post/[postId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="community/user/[userId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="marketplace/[listingId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="marketplace/messages/[listingId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
