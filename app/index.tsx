import { FlatList, View } from "react-native";
import { products } from "../assets/product";
import { ProductListItem } from "../components/ProductListItem";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={products}
        numColumns={ 2 }
        contentContainerClassName=" gap-2 p-4"
        columnWrapperClassName="gap-2" 
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductListItem product={{ ...item, manufacturer: item.manufacturer || "Unknown" }} />
        )}
      />
    </View>
  );
}
