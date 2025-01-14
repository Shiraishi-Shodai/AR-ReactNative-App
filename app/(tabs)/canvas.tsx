import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GetCommentList from "@/components/GetCommentList";
import AddComment from "@/components/AddComment";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
    },
    header: {
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>デバック</Text>
            </View>
            <GetCommentList />
            <AddComment />
        </View>
    );
};
