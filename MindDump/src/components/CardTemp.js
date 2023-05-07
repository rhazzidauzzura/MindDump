import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

export const CardTemp = ({ item }) => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate.navigate("Detail", item.item)} style={styles.card}>
      <Image
        style={{ width: "100%", maxHeight: 200, minHeight: 150 }}
        source={{
          uri: item.item.gif,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{item.item.title}</Text>
        <Text style={styles.desc}>
          {new Date(item.item.date).toLocaleString("id-ID", {
            month: "long",
            day: "numeric",
            weekday: "long",
            year: "numeric",
          }) || ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "49%",
    maxWidth: "50%",
    minHeight: 70,
    borderRadius: 8,
    borderColor: "#eaeaea",
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 7,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 17,
  },
  desc: {
    fontSize: 12,
    color: "#bababa",
  },
});
