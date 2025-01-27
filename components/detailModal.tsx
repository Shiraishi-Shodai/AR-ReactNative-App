import { ARObject } from "@/classies/ARObject";
import { Stamp } from "@/classies/Stamp";
import { Comment } from "@/classies/Comment";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";

interface DetailModalProps {
    isVisible: boolean;
    onClose: () => void;
    content: ARObject;
    data: {
        createdAt: string;
    };
}

const DetailModal = ({
    isVisible,
    onClose,
    content,
    data,
}: DetailModalProps) => {
    const { ARObjectModalType } = useARObjectModalContext();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.userInfo}>
                        {content.user_photoURL ? (
                            <Image
                                source={{ uri: content.user_photoURL }}
                                style={styles.iconSize}
                                resizeMode={"cover"}
                            />
                        ) : (
                            <Image
                                source={require("../assets/images/a.png")}
                                style={styles.iconSize}
                                resizeMode={"cover"}
                            />
                        )}
                        <View style={styles.userName}>
                            <Text>{content.user_displayName}</Text>
                        </View>
                        <View style={styles.postTime}>
                            <Text>
                                {data.createdAt
                                    .slice(0, 10)
                                    .replaceAll("-", "/")}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={styles.detailContent}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {ARObjectModalType == ARObjectModalEnum.Stamp
                            ? (content as Stamp).img_path
                            : (content as Comment).text}
                    </Text>
                    <View style={styles.location}>
                        <FeatherIcon name="map-pin" size={24} />
                        <Text>
                            {content.latitude}, {content.longitude},{" "}
                            {content.altitude}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>閉じる</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    Stamp: {
        width: 100,
        height: 100,
    },
    userInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconSize: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#666",
        marginLeft: 10,
        marginBottom: 0,
    },
    postTime: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
        marginLeft: "auto",
    },
    detailContent: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 8,
        backgroundColor: "#f9f9f9",
        minHeight: 40,
        width: "100%",
    },
    location: {
        display: "flex",
        flexDirection: "row",
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "white",
    },
});
const userIconStyles = StyleSheet.create({
    iconContainer: {
        position: "absolute",
        top: "7%",
        left: "83%",
        zIndex: 1,
    },
    iconSize: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default DetailModal;
