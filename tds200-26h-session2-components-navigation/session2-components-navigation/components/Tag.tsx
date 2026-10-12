import { View, Text, StyleSheet } from "react-native";
import React from "react";

type TagProps = { 
    label: string;
};

export default function Tag({label}: TagProps) {
    return (
        <View style={styles.tag}>
            <Text style={styles.label}> 
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "#E8F0FE",
        paddingHorizontal: 10,
        paddingVertical: 6, 
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },

    label: {
        fontSize: 13,
        color: "#1A73E8",
        fontWeight: "600",
    },
});