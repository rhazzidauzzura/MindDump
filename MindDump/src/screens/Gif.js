import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CardGif } from "../components/CardGif";

export default function Card() {
  const navigate = useNavigation();
  const [gif, setGif] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const apiKey = "qM55fz5zq5VK2TzsddTzeL8F6qEX1kWY";

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const fetchData = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q || "sad"}&limit=25&offset=0&rating=g&lang=en`);
      const result = await res.json();

      if (!res.ok) setGif([]);

      setGif(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelected({
      id: item.item.id,
      title: item.item.title,
      gif: item.item.images.downsized_large.url,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 400, fontSize: 25 }}>Create Mind</Text>
            <Text style={{ fontWeight: 900, fontSize: 25 }}>Dump</Text>
          </View>
          <Ionicons onPress={() => navigate.goBack()} name="close" size={25} />
        </View>
        <View style={{ height: "95%" }}>
          <View>
            <TextInput style={styles.input} onChangeText={setSearch} value={search} placeholder="Find a GIF" />
          </View>
          {loading && <Text>Loading....</Text>}
          {!loading && (
            <FlatList
              data={gif}
              renderItem={(item) => (
                <CardGif
                  item={item}
                  selected={item.item.id === selected.id}
                  onTap={() => {
                    handleSelect(item);
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("Form", selected);
            }}
            disabled={!selected.id}
            style={{ padding: 10, marginTop: 10, borderRadius: 20, backgroundColor: "#ccff00", opacity: !selected.id ? 0.3 : 1 }}
          >
            <Text style={{ textAlign: "center", fontWeight: 600 }}>Select a GIF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  content: {
    height: "100%",
    padding: 25,
  },
  header: {
    height: "7%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#f2f2f2",
    height: 40,
    padding: 10,
    marginVertical: 15,
  },
});
