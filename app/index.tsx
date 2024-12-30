import { FlatList, View } from "react-native";
import { products } from "../assets/product";
import { ProductListItem } from "../components/ProductListItem";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
}
