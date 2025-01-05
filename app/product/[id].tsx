import { fetchProductsByIdEP } from "@/api/products";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack"; 
import { useCartStore } from "@/store/cardStore";
import { formatCurrency } from "@/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

const details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toast = useToast();

  const addToCart = useCartStore((state:any) => state.addProductToCart); 

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
  }

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
    <Box className="p-6   flex-1 ">
      <Stack.Screen options={{ title: product.name }} />
      <Card className="p-5 rounded-lg   ">
        {product.images.length > 0 && (
          <Image
            source={product.images[0].url}
            className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
            alt={`${product.name} image`}
            resizeMode="contain"
          />
        )}
        <Text className="text-sm font-normal mb-2 text-typography-700">{product.name}</Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            {formatCurrency(product.price)}
          </Heading>
          <Text size="sm" isTruncated>
            {product.description}
          </Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button onPress={cartHandler} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button variant="outline" className="px-4 py-2 border-outline-300 sm:flex-1">
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default details;
