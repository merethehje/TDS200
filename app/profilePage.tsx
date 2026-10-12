
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/student_picture.png")}
                style={styles.profileImage}
                accessibilityLabel="Profilbilde"
            />

            <Text style={styles.title}>Merethe Student</Text>

            <Text style={styles.subtitle}>
                Frontend- og mobilutviklingsstudent
            </Text>

            <View style={styles.card}>
                <Text style={styles.heading}>Om meg</Text>

                <Text style={styles.bio}>
                    Hei! Jeg studerer frontend- og mobilutvikling
                    ved Høyskolen Kristiania. I dette prosjektet
                    lærer jeg å utvikle mobilapper med React Native
                    og Expo.
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Alder</Text>
                <Text style={styles.info}>24 år</Text>

                <Text style={styles.infoLabel}>Studie</Text>
                <Text style={styles.info}>
                    Bachelor i frontend- og mobilutvikling
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "white",
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 3,
        borderColor: "lightgray",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "black",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: "gray",
        marginTop: 6,
        marginBottom: 24,
        textAlign: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        padding: 18,
        borderRadius: 16,
        marginBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: "black",
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        lineHeight: 24,
        color: "lightgray",
    },
    infoContainer: {
        width: "100%",
        backgroundColor: "white",
        padding: 18,
        borderRadius: 16,
    },
    infoLabel: {
        fontSize: 13,
        color: "gray",
        marginBottom: 4,
    },
    info: {
        fontSize: 16,
        color: "black",
        marginBottom: 12,
    },
});