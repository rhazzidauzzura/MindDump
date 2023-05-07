import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const TempScreen = ({ route }) => {
  const item = route.params;
  const richText = React.useRef();
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    setLoading(true);
    try {
      let value = await AsyncStorage.getItem("Temps");
      value = JSON.parse(value) || [];
      const json = JSON.stringify([
        ...value,
        {
          title: item.title,
          gif: item.gif,
          description,
          date: new Date(),
        },
      ]);
      await AsyncStorage.setItem("Temps", json);
      navigate.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 400, fontSize: 25 }}>Create Mind</Text>
            <Text style={{ fontWeight: 800, fontSize: 25 }}>Dump</Text>
          </View>
          <Ionicons onPress={() => navigate.navigate("Gif")} name="close" size={25} />
        </View>

        <Image source={{ uri: item.gif }} style={styles.img} />

        <RichToolbar
          style={{ marginVertical: 10, borderRadius: 15 }}
          editor={richText}
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.removeFormat,
            actions.insertVideo,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
          iconMap={{ [actions.heading1]: handleHead }}
        />

        <RichEditor useContainer={false} editorStyle={{ backgroundColor: "#F6F6F6", height: "50%" }} placeholder="Dump Your Mind" containerStyle={{ minHeight: 150, borderRadius: 20 }} ref={richText} onChange={setDescription} />

        <TouchableOpacity disabled={loading} onPress={handleSave} style={styles.btn}>
          {!loading && <Text style={styles.text}>Simpan</Text>}
          {loading && <Text style={{ textAlign: "center", fontWeight: 600 }}>Loading...</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: 23,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  img: {
    width: 200,
    height: 150,
    backgroundColor: "black",
    marginHorizontal: 64,
  },
  btn: {
    padding: 10,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: "gray",
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
  },
});

export default TempScreen;
