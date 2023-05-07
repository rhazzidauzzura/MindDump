import { TouchableOpacity, Image } from "react-native";

export function CardGif({ item, onClick, selected }) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: "50%",
        maxWidth: "50%",
        maxHeight: 200,
      }}
    >
      <Image
        style={{ width: "97%", height: "99%", opacity: selected ? 0.3 : 1 }}
        source={{
          uri: item.item.images.downsized_large.url,
        }}
      />
    </TouchableOpacity>
  );
}
