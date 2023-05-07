import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardGif } from "../components/CardGif";

export default function Card() {
  const navigate = useNavigation();
  const [gif, setGif] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState({});
  const [loading, setLoading] = useState(false);

  const apiKey = "qM55fz5zq5VK2TzsddTzeL8F6qEX1kWY";

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const fetchData = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q || "random"}&limit=25&offset=0&rating=g&lang=en`);
      const result = await res.json();

      if (!res.ok) {
        setGif([]);
      }

      setGif(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelect({
      id: item.item.id,
      title: item.item.title,
      gif: item.item.images.downsized_large.url,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 25, fontFamily: "Roboto" }}>Create Mind</Text>
            <Text style={{ fontWeight: 900, fontSize: 25, fontFamily: "Roboto" }}>Dump</Text>
          </View>
          <Ionicons onPress={() => navigate.navigate("Home")} name="close" size={25} />
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
                  selected={item.item.id === select.id}
                  onClick={() => {
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
              navigate.navigate("Form", select);
            }}
            disabled={!select.id}
            style={{ ...styles.btn, opacity: !select.id ? 0.7 : 1 }}
          >
            <Text style={styles.text}>Select a GIF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  content: {
    height: "100%",
    padding: 15,
  },
  header: {
    height: "6%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#f2f2f2",
    height: 40,
    padding: 10,
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
  },
  btn: {
    padding: 10,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: "gray",
  },
});
