import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CardTemp } from "../components/CardTemp";

export default Home = () => {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const [gif, setGif] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData(search);
  }, [isFocused, search]);

  const fetchData = async (search) => {
    try {
      let value = await AsyncStorage.getItem("Temps");
      value = JSON.parse(value) || [];
      if (value && search) value = value.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()));
      setGif(value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TextInput style={styles.textInput} value={search} onChangeText={setSearch} placeholder="Search..." />
          <Ionicons onPress={() => navigate.navigate("Home")} name="close" size={30} />
        </View>
        <View style={{ height: "75%", justifyContent: "center" }}>
          {gif.length <= 0 && (
            <Text style={{ left: 56 }}>
              You Don't have a Mind<Text style={{ fontWeight: 700 }}>Dump</Text> data
            </Text>
          )}
          {gif.length > 0 && <FlatList columnWrapperStyle={{ justifyContent: "space-between", margin: 3 }} data={gif} renderItem={(item) => <CardTemp item={item} />} keyExtractor={(item, i) => i} numColumns={2} />}
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
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  content: {
    height: "100%",
    padding: 10,
  },
  header: {
    height: "15%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
  textInput: {
    height: 40,
    padding: 10,
    marginVertical: 15,
    flex: 1,
  },
});
