
// Code to solve task from class 3: 

// useState manages the post data and loading state.
// useEffect loads the post from AsyncStorage.
// Stack.Screen sets the navigation header title.

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import {
  Stack,
  useLocalSearchParams,
} from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { PostData } from "@/utils/postData";

// Key used for storing posts in AsyncStorage. 

const POSTS_KEY = "tds200_posts";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Store the post details and loading state.
  // The post is initially undefined, and loading starts as true.

  const [post, setPost] = useState<PostData | undefined>();
  const [loading, setLoading] = useState(true);

  // useEffect to load the post details from AsyncStorage. -M

  useEffect(() => {
    async function loadPost() {
      try {
        const stored = await AsyncStorage.getItem(POSTS_KEY);

        if (stored !== null) {
          const posts: PostData[] = JSON.parse(stored);
          const foundPost = posts.find((item) => item.id === id);

          setPost(foundPost);
        }
      } catch (error) {
        console.error("Could not load post:", error);
      } finally {
        setLoading(false);
      }
    }

    // Call the loadPost function to fetch the post details.

    loadPost();
  }, [id]);

  // Rendering post

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If the post is not found, display an error message.
    // Same as class 2 code, but now we are fetching the post from AsyncStorage instead of dummy data. -M

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Post not found.</Text>
      </View>
    );
  }

  // If the post is found, display its details.
   // Show the navigation header and use the post title as the header title. -M

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: post.title,
          headerBackVisible: true,
        }}
      />

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>By {post.author}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.hashtags}>{post.hashtags}</Text>
    </View>
  );
}

// Styles is same as from class 2 code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "gray",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  hashtags: {
    fontSize: 13,
    color: "gray",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 40,
  },
});
