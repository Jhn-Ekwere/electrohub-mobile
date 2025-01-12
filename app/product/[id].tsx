import { fetchProductsByIdEP } from "@/api/products";
import CustomHeader from "@/components/customHeader";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useCartStore } from "@/store/cardStore";
import { formatCurrency } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ShoppingBag, Star } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toast = useToast();

  const addToCart = useCartStore((state: any) => state.addProductToCart);

  const cartHandler = () => {
    addToCart(product);
    toast.show({
      placement: "top",
      duration: 1000,
      render: () => (
        <Toast action="success" variant="outline">
          <ToastTitle>Product added</ToastTitle>
          <ToastDescription>{product.name} added to cart</ToastDescription>
        </Toast>
      ),
    });
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({ queryKey: ["products", id], queryFn: () => fetchProductsByIdEP(id) });

  if (isLoading)
    return (
      <Center className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </Center>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className=" flex-1 bg-background-0  ">
      <Stack.Screen options={{ header: () => <CustomHeader title={"Details"} left={true} right={true} /> }} />
      <ScrollView
        className=" p-4 flex-1 "
        style={{
          marginBottom: 100,
        }}
      >
        <Card className=" rounded-lg   ">
          <Box className="flex justify-between items-center rounded-lg bg-[#f3f3f5] mb-4 overflow-hidden ">
            {product.images.length > 0 && (
              <Image
                source={product.images[0].url}
                className="mb-6 h-[368.53px] w-full  aspect-[4/3]"
                alt={`${product.name} image`}
                resizeMode="contain"
              />
            )}
          </Box>
          <Text className="text-2xl font-bold mb-2 ">{product.name}</Text>
          <VStack space="sm" className="">
            <Box className=" flex-row items-center   ">
              <Star size={20} color="#eab308" />
              <View className=" flex-row " >
                <Text className="ml-2 font-medium underline">{product.star}.0/5 </Text>
                <Text className=" font-medium">({product.numReviews} reviews)</Text>
              </View>
            </Box>
            <Text size="sm" isTruncated>
              {product.description}
            </Text>
          </VStack>
        </Card>
      </ScrollView>
      <Box
        className=" items-center absolute w-full bottom-0 bg-background-0  px-8 left-0 flex-1  flex-row border-t border-outline-300 p-4"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: 0,
          padding: 25,
          gap: 30,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Box>
          <Text size="lg" className="text-typography-600">
            Price
          </Text>
          <Text className=" text-2xl font-bold text-black">{formatCurrency(product.price)}</Text>
        </Box>
        <Button
          onPress={cartHandler}
          className="flex-1 bg-black "
          style={{
            flex: 1,
            height: 54,
            borderRadius: 10,
          }}
        >
          <ShoppingBag size="20" color="white" />
          <ButtonText size="md">Add to Cart</ButtonText>
        </Button>
      </Box>
    </View>
  );
};

export default details;
