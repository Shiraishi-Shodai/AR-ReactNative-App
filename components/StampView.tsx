import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StampManager } from "@/classies/StampManager";
import { ARObject } from "@/classies/ARObject";
import { Stamp } from "@/classies/Stamp";

const StampView = () => {
  // useState で型を明示的に指定
  const [stamps, setStamps] = useState<Stamp[]>([]); // [string, Stamp] の配列
  const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null); // 選択されたスタンプ

  // データを取得する関数
  const fetchData = async () => {
    const manager = new StampManager();
    try {
      const data = await manager.getARObjects();
      if (data) {
        // データを [key, value] の配列として保存
        setStamps(data);
      }
    } catch (error) {
      console.error("Error fetching stamps:", error);
    }
  };

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  // スタンプがタッチされた時の処理
  const handlePress = (stamp: Stamp) => {
    setSelectedStamp(stamp); // 選択されたスタンプを状態に保存
  };

  return (
    <View style={styles.container}>
      {/* 選択されたスタンプがあれば表示 */}
      {selectedStamp && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>Selected Stamp:</Text>
          <Image
            source={{ uri: selectedStamp.source }}
            style={styles.selectedImage}
          />
          <Text>Name: {selectedStamp.name}</Text>
          <Text>Latitude: {selectedStamp.latitude}</Text>
          <Text>Longitude: {selectedStamp.longitude}</Text>
          <Text>Altitude: {selectedStamp.altitude}</Text>
          <Text>User ID: {selectedStamp.user_id}</Text>
        </View>
      )}

      <FlatList
        data={stamps} // データをリストに渡す
        keyExtractor={(item) => item.id} // Firebaseのキーを使用
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={styles.itemContainer}
            >
              <Image source={{ uri: item.source }} style={styles.image} />
              <Text>ID: {item.id}</Text>
              <Text>Name: {item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  itemContainer: { marginBottom: 15 },
  image: { width: 100, height: 100, marginBottom: 5 },
  selectedContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  selectedText: { fontSize: 18, fontWeight: "bold" },
  selectedImage: { width: 150, height: 150, marginBottom: 10 },
});

export default StampView;
