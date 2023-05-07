import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

export const CardDump = ({ item }) => {
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
    borderRadius: 10,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    overflow: "hidden",
  },
  container: { padding: 10 },
  title: { fontSize: 20 },
  desc: { fontSize: 10, color: "#bababa" },
});
