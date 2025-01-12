import CustomHeader from "@/components/customHeader";
import { ProductListItem } from "@/components/ProductListItem";
import { Heading } from "@/components/ui/heading";
import { useSavedItemStore } from "@/store/savedItemStore";
import { Stack } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import { View, Text, FlatList } from "react-native";

const Saved = () => {
  const savedItems = useSavedItemStore((state: any) => state.savedItems);
  return (
    <View className=" flex-1 p-2 bg-background-0" style={{ paddingTop: 20, paddingBottom: 220 }}>
      <Stack.Screen
        name="home"
        options={{
          header: () => <CustomHeader title="Saved Items" left={true} right={true} />,
        }}
      />
      {savedItems.length !== 0 ? (
        <FlatList
          data={savedItems}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductListItem product={item} />}
        />
      ) : (
        <View className="flex-1 justify-center items-center self-center  " style={{ width: 230 }}>
          <Heart size={64} color={"#B3B3B3"} className="text-center text-xl " />
          <Heading className="text-center text-xl">No saved items!</Heading>
          <Text className="text-center  text-gray-500">You don’t have any saved items. Go to home and add some.</Text>
        </View>
      )}
    </View>
  );
};

export default Saved;
