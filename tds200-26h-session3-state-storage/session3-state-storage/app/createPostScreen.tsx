// New file to solve task from class 3: CreatePostScreen.tsx - M

import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostData } from "@/utils/postData";
import { getAllPosts } from "@/utils/dummyPostData";
import Post from "@/components/Post";
import Spacer from "@/components/Spacer";

// Key used for storing posts in AsyncStorage.

const POSTS_KEY = "tds200_posts";

export default function CreatePostScreen() {

// State variables for title, description, posts, loading state, and loading state.
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // useEffect to load posts from AsyncStorage

    useEffect(() => {
        loadPosts();
    }, []);

    // Fetch posts from AsyncStorage or seed with dummy data if none exist.

    async function loadPosts() {
        try {
            const stored = await AsyncStorage.getItem(POSTS_KEY);

            if (stored !== null) {
                setPosts(JSON.parse(stored));
            } else {
                const initialPosts = getAllPosts();
                await AsyncStorage.setItem(
                    POSTS_KEY,
                    JSON.stringify(initialPosts)
                );
                setPosts(initialPosts);
            }
        } catch (error) {
            Alert.alert("Feil", "Kunne ikke laste innleggene.");
        } finally {
            // Set loading to false when posts are loaded. 
            setLoading(false);
        }
    }

    // Handle the creation of a new post, validate input, and save to AsyncStorage.

    async function handleCreatePost() {
        if (!title.trim() || !description.trim()) {
            Alert.alert("Mangler informasjon", "Fyll inn både tittel og beskrivelse.");
            return;
        }

        // Set saving state to true while the post is being saved.

        setSaving(true);

        // Try to save the new post to AsyncStorage and update the state.

        try {
            const stored = await AsyncStorage.getItem(POSTS_KEY);

            // Parse the existing posts or initialize an empty array if none exist.
            const currentPosts: PostData[] = stored
                ? JSON.parse(stored)
                : [];

            // Create a new post object with a unique ID, title, description, and author.
            const newPost: PostData = {
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim(),
                hashtags: "",
                author: "You",
            };

            // Update the existing posts array with the new post at the beginning.

            const updatedPosts = [newPost, ...currentPosts];

            // Save the updated posts array back to AsyncStorage.

            await AsyncStorage.setItem(
                POSTS_KEY,
                JSON.stringify(updatedPosts)
            );

            // Update the state with the new posts array, reset the input fields, and show a success alert.
            setPosts(updatedPosts);
            setTitle("");
            setDescription("");
            Alert.alert("Suksess", "Innlegget ble lagret.");
        } catch (error) {
            Alert.alert("Feil", "Kunne ikke lagre innlegget.");
        } finally {
            setSaving(false);
        }
    }

    // Show a loading indicator while posts are being fetched from AsyncStorage.
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text>Laster innlegg...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
            // Render the list of posts, with a form for creating new posts at the top.
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Post postData={item} />
                )}
                // Add spacing between posts in the list.
                ItemSeparatorComponent={() => <Spacer height={12} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View style={styles.form}>
                        <Text style={styles.heading}>Create a post</Text>

                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter a title"
                            maxLength={100}
                        />

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Write your post..."
                            multiline
                            textAlignVertical="top"
                            maxLength={1000}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCreatePost}
                            disabled={saving}
                        >
                            <Text style={styles.buttonText}>
                                {saving ? "Saving..." : "Create post"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.subheading}>
                            Saved posts ({posts.length})
                        </Text>
                        <Spacer height={12} />
                    </View>
                }
                // Show a message when there are no posts saved yet.
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No posts yet. Create your first post above.
                    </Text>
                }
            />
        </View>
    );
}

// Styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    list: {
        padding: 16,
        paddingBottom: 32,
    },
    form: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    descriptionInput: {
        minHeight: 110,
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginBottom: 28,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    subheading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        color: "gray",
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
});
