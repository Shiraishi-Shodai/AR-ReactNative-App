import React from "react";
import { Image } from "react-native";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import { ARObject } from "@/classies/ARObject";
import FeatherIcon from "@expo/vector-icons/Feather";
import { User } from "@/classies/User";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useARObjectModalContext } from "@/hooks/useARObjectModalContext";
import { ARObjectModalEnum } from "@/constants/ARObjectModalEnum";
import { Stamp } from "@/classies/Stamp";
import { Comment } from "@/classies/Comment";
import DetailModal from "./detailModal";

interface RenderItemProps {
    item: ARObject;
    animatedValue: Animated.Value;
    width: number;
    height: number;
}

const RenderItem = ({
    item,
    animatedValue,
    width,
    height,
}: RenderItemProps) => {
    const { user }: { user: User } = useContext(AuthContext) as { user: User };
    const { ARObjectModalType } = useARObjectModalContext();
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    return (
        // アニメーションが可能なビュー
        <Animated.View
            style={[
                styles.rowFrontContainer,
                { width: width * 0.95 },
                {
                    // アニメーションの動きを定義
                    height: animatedValue.interpolate({
                        inputRange: [0, 1], // animatedValueは0~1の入力を受け取る
                        outputRange: [0, height * 0.1], // 0を入力したとき高さは0すなわち見えなくなる, 1のとき高さはheight * 0.1。項目1つ分のデフォルトの高さ
                    }),
                },
            ]}
        >
            <TouchableHighlight
                style={[styles.rowFront, { height: height * 0.09 }]}
                underlayColor={"#AAA"}
                onPress={() => setIsDetailModalVisible(true)}
            >
                <View style={styles.item}>
                    {item.user_photoURL ? (
                        <Image
                            source={{ uri: item.user_photoURL }}
                            style={{
                                width: width * 0.15,
                                height: width * 0.15,
                            }}
                            resizeMode={"cover"}
                        />
                    ) : (
                        <Image
                            source={require("../assets/images/a.png")}
                            style={{
                                width: width * 0.15,
                                height: width * 0.15,
                            }}
                            resizeMode={"cover"}
                        />
                    )}

                    <View style={{ paddingLeft: width * 0.02 }}>
                        <View style={{ width: width * 0.6 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: "bold",
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {ARObjectModalType == ARObjectModalEnum.Stamp
                                    ? (item as Stamp).img_path
                                    : (item as Comment).text}
                            </Text>
                        </View>

                        <View style={styles.location}>
                            {/* マップアイコン */}
                            <FeatherIcon name="map-pin" size={width * 0.05} />
                            {/* 緯度、軽度、高度を表示 */}
                            <View>
                                <Text>
                                    {item.latitude}, {item.longitude},{" "}
                                    {item.altitude}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.postTime}>
                            <Text>
                                {item.post_time
                                    .slice(0, 10)
                                    .replaceAll("-", "/")}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            <DetailModal
                isVisible={isDetailModalVisible}
                onClose={() => setIsDetailModalVisible(false)}
                content={item}
                data={{
                    createdAt: item.post_time,
                }}
            />
        </Animated.View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    rowFrontContainer: {
        backgroundColor: "white",
    },
    rowFront: {
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 5,
        justifyContent: "center",
    },
    item: {
        flexDirection: "row",
        width: "95%",
    },
    location: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "80%",
    },
    postTime: {
        position: "absolute",
        top: "70%",
        left: "90%",
    },
});
