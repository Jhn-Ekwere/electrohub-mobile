import { View, Text } from "react-native";

interface Product {
  _id: string;
  name: string;
}
export function ProductListItem({ product }: { product: Product }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        {product.name}
      </Text>
    </View>
  );
}
