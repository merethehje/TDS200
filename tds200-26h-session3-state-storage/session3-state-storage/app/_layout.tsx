import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

// Added a new screen, createPostScreen. -M

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Home",
          }}
        />
        <Stack.Screen name="postDetails/[id]" />
      <Stack.Screen
        name="CreatePostScreen"
        options={{ title: "Create post" }}
      />
      </Stack>
      <Toast />
    </>
  );
}
