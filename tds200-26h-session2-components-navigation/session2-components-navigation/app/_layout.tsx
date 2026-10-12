
import { Stack } from "expo-router";
import React from "react";

//headerShown: false hides the outer stacks headline

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="settingsScreen"
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />
    </Stack>
  );
}
