import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CardTemp } from "../components/CardTemp";
import { StyleSheet } from "react-native";

export default Home = () => {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const [gif, setGif] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = async () => {
    try {
      let value = await AsyncStorage.getItem("Temps");
      value = JSON.parse(value) || [];
      setGif(value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 300, fontSize: 28 }}>Mind</Text>
            <Text style={{ fontWeight: 700, fontSize: 28 }}>Dump</Text>
          </View>
          <Ionicons onPress={() => navigate.navigate("Search")} name="search" size={30} />
        </View>
        <View style={{ height: "75%", justifyContent: "center" }}>
          {gif.length <= 0 && (
            <Text style={{ left: 56 }}>
              You Don't have a Mind<Text style={{ fontWeight: 600 }}>Dump</Text> data
            </Text>
          )}
          {gif.length > 0 && <FlatList columnWrapperStyle={{ justifyContent: "space-between" }} data={gif} renderItem={(item) => <CardTemp item={item} />} keyExtractor={(item, i) => i} numColumns={2} />}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate.navigate("Gif")} style={styles.btn}>
        <Text style={styles.text}>+ MindDump</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    position: "relative",
  },
  content: {
    height: "100%",
    padding: 20,
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 25,
    bottom: 50,
    right: 25,
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "gray",
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 800,
  },
  header: {
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
