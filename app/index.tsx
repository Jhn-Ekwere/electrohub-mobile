import { ActivityIndicator, FlatList, View } from "react-native";
import { ProductListItem } from "../components/ProductListItem";
import { fetchProductsEP } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text/index.web";
import { Center } from "@/components/ui/center";

export default function HomeScreen() {
  const { data: products, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProductsEP });

  if (isLoading)
    return (
      <Center className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </Center>
    );
  if (error) return <Text>Error: { error.message }</Text>; 

  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        contentContainerClassName=" gap-2 p-4"
        columnWrapperClassName="gap-2"
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductListItem product={item} />
        )}
      />
    </View>
  );
}
