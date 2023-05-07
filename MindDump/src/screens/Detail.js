import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

export default Detail = ({ route }) => {
  const item = route.params;
  const { width } = useWindowDimensions();
  const navigate = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Ionicons onPress={() => navigate.goBack()} size={40} name="close" style={styles.close} color="white" />
      <Image
        style={styles.img}
        source={{
          uri: item.gif,
        }}
      />
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleString("en-EN", {
              month: "long",
              day: "numeric",
              weekday: "long",
              year: "numeric",
            }) || ""}
          </Text>
        </View>
        <View style={styles.desc}>
          <RenderHtml source={{ html: item.description }} contentWidth={width} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
  },
  img: {
    width: "100%",
    height: 250,
  },
  scroll: {
    padding: 35,
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
  },
  date: {
    fontSize: 12,
  },
  desc: {
    paddingVertical: 40,
  },
});
