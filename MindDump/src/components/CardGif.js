import { TouchableOpacity, Image } from "react-native";

export default function CardGif({ item, onTap, selected }) {
  return (
    <TouchableOpacity
      onPress={onTap}
      style={{
        width: "50%",
        maxWidth: "50%",
        maxHeight: 200,
      }}
    >
      <Image
        style={{ width: "98%", height: "99%", opacity: selected ? 0.5 : 1 }}
        source={{
          uri: item.item.images.downsized_large.url,
        }}
      />
    </TouchableOpacity>
  );
}
