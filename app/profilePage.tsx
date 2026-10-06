import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style = {styles.title}>
                Merethe Student
                </Text>
            <Text style = {styles.bio}>
                Hei! Dette er ett prosjekt for å lære meg React Native og Expo som en del av studiet. Jeg vil legge til mer styling ved senere anledning. 
            </Text>

            <Text style= {styles.info}>
                Alder: 24
            </Text>
            <Text style= {styles.info}>
                Studie: Frontend- og mobilutviklingsbachelor hos Kristiania
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    
    title: {
        fontSize: 26,
        fontWeight: "600",
    },
    bio: {
        fontSize: 16,
        fontWeight: "600",
    },
    info: {
        fontSize: 16,
        fontWeight: "600",
    },
});