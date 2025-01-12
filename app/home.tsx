import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { ProductListItem } from "../components/ProductListItem";
import { fetchProductsEP } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import SearchBar from "@/components/Search";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Stack } from "expo-router";
import CustomHeader from "@/components/customHeader";

const filterList = [
  "capacitor",
  "resistor",
  "ic",
  "transistor",
  "diode",
  "inductor",
  "connector",
  "relay",
  "switch",
  "crystal",
  "oscillator",
  "sensor",
  "transformer",
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { data: products, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProductsEP });

  if (isLoading)
    return (
      <Center className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </Center>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <VStack space="lg" className=" bg-background-0  " style={{ paddingTop: 40, paddingBottom:220 }}>
      <Stack.Screen
        name="home"
        options={{
          header: () => <CustomHeader title="Shop" right={true} />,
        }}
      />
      <SearchBar setSearchText={setSearchText} />
      <VStack space="lg" className=" p-4">
        <FlatList
          data={filterList}
          horizontal
          keyExtractor={(item) => item}
          className=" ov"
          renderItem={({ item }) => (
            <Pressable>
              <View className="mr-2 bg-background-1 rounded-lg border border-outline-200  hover:bg-background-2 onPointerOver:bg-black ">
                <Text className=" text-black capitalize p-2  px-4  ">{item}</Text>
              </View>
            </Pressable>
          )}
        />
      </VStack>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </VStack>
  );
}
