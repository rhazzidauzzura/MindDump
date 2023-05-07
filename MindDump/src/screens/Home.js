import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CardTemp } from "../components/CardTemp";
import { StyleSheet } from "react-native";

export default Home = () => {
  const [gif, setGif] = useState([]);
  const navigate = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = async () => {
    try {
      let value = await AsyncStorage.getItem("DUMPS");
      value = JSON.parse(value) || [];
      setGif(value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 300, fontSize: 28 }}>Mind</Text>
            <Text style={{ fontWeight: 900, fontSize: 28 }}>Dump</Text>
          </View>
          <Ionicons onPress={() => navigate.navigate("Search")} name="search" size={30} />
        </View>
        <View style={{ height: "95%" }}>
          {gif.length <= 0 && <Text>No data please add dumps</Text>}
          {gif.length > 0 && <FlatList columnWrapperStyle={{ justifyContent: "space-between", margin: 3 }} data={gif} renderItem={(item) => <CardTemp item={item} />} keyExtractor={(item, i) => i} numColumns={2} />}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate.navigate("Gif")} style={styles.btn}>
        <Text style={{ textAlign: "center", fontWeight: 800 }}>+ MindDump</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    position: "relative",
  },
  content: {
    height: "100%",
    padding: 25,
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 25,
    bottom: 25,
    right: 20,
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "#ccff00",
  },

  header: {
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
