import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { StampManager } from "@/classies/StampManager";

// スタンプのデータ型を定義
type Stamp = {
    name: string;
    source: string;
    latitude: number;
    longitude: number;
    altitude: number;
    user_id: string;
  };

  const StampView = () => {
    // useState で型を明示的に指定
    const [stamps, setStamps] = useState<[string, Stamp][]>([]); // [string, Stamp] の配列
  
    // データを取得する関数
    const fetchData = async () => {
      const manager = new StampManager();
      try {
        const data = await manager.getARojects();
        if (data) {
          // データを [key, value] の配列として保存
          setStamps(Object.entries(data)); 
        }
      } catch (error) {
        console.error('Error fetching stamps:', error);
      }
    };
  
    // コンポーネントがマウントされたときにデータを取得
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={stamps} // データをリストに渡す
          keyExtractor={(item) => item[0]} // Firebaseのキーを使用
          renderItem={({ item }) => {
            const [id, stamp] = item; // [key, value] 形式
            return (
              <View style={styles.itemContainer}>
                <Image source={{ uri: stamp.source }} style={styles.image} />
                <Text>ID: {id}</Text>
                <Text>Name: {stamp.name}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    itemContainer: { marginBottom: 15 },
    image: { width: 100, height: 100, marginBottom: 5 },
  });
  
  export default StampView;