import React from "react";
import { useCartStore } from "@/store/cardStore";
import { FlatList } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Stack } from "expo-router";
import { Image } from "@/components/ui/image";
import { formatCurrency } from "@/utils/formatter";
import { Box } from "@/components/ui/box";
import CustomHeader from "@/components/customHeader";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react-native";
import { Product } from "@/types";
import { Heading } from "@/components/ui/heading";

const Cart = () => {
  const items = useCartStore((state: any) => state.items);
  const subTotal = useCartStore((state: any) => state.subTotal);
  const resetCart = useCartStore((state: any) => state.resetCart);
  const addToCart = useCartStore((state: any) => state.addProductToCart);
  const removeProduct = useCartStore((state: any) => state.removeProduct);
  const deleteProduct = useCartStore((state: any) => state.deleteProduct);

  const onCheckout = async () => {
    resetCart();
  };

  const cartHandler = (product: Product) => {
    addToCart(product);
  };
  const removeHandler = (product: Product) => {
    removeProduct(product);
  };
  const deleteHandler = (product: Product) => {
    deleteProduct(product);
  };
  const vatPercentage = 7;

  const vat = subTotal * (vatPercentage / 100);
  const shippingFee = 5000;
  const total = subTotal + vat + shippingFee;

  return (
    <>
      <Stack.Screen
        name="cart"
        options={{
          header: () => <CustomHeader left={true} right={true} title="Cart" />,
        }}
      />
      {items.length === 0 ? (
        <Box className="flex-1 justify-center items-center self-center  " style={{ width: 230 }}>
          <ShoppingCart size={64} color={"#B3B3B3"} className="text-center text-xl " />
          <Heading className="text-center text-xl">Your Cart Is Empty!</Heading>
          <Text className="text-center  text-gray-500">When you add products, they'll appear here.</Text>
        </Box>
      ) : (
        <Box
          className="flex-1 bg-background-0 "
          style={{
            paddingBottom: 100,
          }}
        >
          <Box className=" flex-1">
            <FlatList
              data={items}
              className="p-4"
              renderItem={({ item }) => (
                <Box className="border border-slate-200 m-1 ">
                  <HStack space="md" className=" items-center p-2  rounded max-w-[950px] w-full  ">
                    <Image
                      size="lg"
                      source={item.product.images[0].url}
                      alt={`${item.product.name} image`}
                      className="rounded"
                    />
                    <VStack space="lg" className="flex-1 ">
                      <HStack space="md" className=" flex-row  justify-between  ">
                        <Box className=" flex-1">
                          <Text isTruncated className=" flex-1 text-lg ">
                            {item.product.name}
                          </Text>
                        </Box>
                        <Button
                          className="  bg-transparent h-8 rounded p-1"
                          onPress={() => deleteHandler(item.product)}
                        >
                          <Trash2 size={18} color="red" />
                        </Button>
                      </HStack>
                      <HStack space="sm" className=" justify-between">
                        <Text className="font-semibold">{formatCurrency(item.product.price)}</Text>
                        <Box className=" flex-row items-center gap-2 ">
                          <Button
                            className=" border bg-transparent h-8 rounded p-1"
                            onPress={() => removeHandler(item.product)}
                          >
                            <Minus size={18} color="black" />
                          </Button>
                          <Text className="ml-auto">{item.quantity}</Text>
                          <Button
                            className=" border bg-transparent h-8 rounded p-1"
                            onPress={() => cartHandler(item.product)}
                          >
                            <Plus size={18} color="black" />
                          </Button>
                        </Box>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              )}
            />
          </Box>
          <Box className=" shadow-lg border-t-hairline  p-6">
            <VStack space="md" className=" mb-2">
              <Box className="flex-row justify-between">
                <Text className="font">Sub-total</Text>
                <Text className="font-semibold text-black">{formatCurrency(subTotal)}</Text>
              </Box>
              <Box className="flex-row justify-between">
                <Text className="font">VAT ({vatPercentage}%)</Text>
                <Text className="font-semibold text-black">{formatCurrency(vat)}</Text>
              </Box>
              <Box className="flex-row justify-between">
                <Text className="font">Shipping fee</Text>
                <Text className="font-semibold text-black">{formatCurrency(shippingFee)}</Text>
              </Box>
              <Box className="flex-row justify-between border-t border-outline-300 mt-4 py-4  ">
                <Text className=" text-lg text-black">Total</Text>
                <Text className="font-bold text-lg text-black">{formatCurrency(total)}</Text>
              </Box>
            </VStack>
            <Button className=" items-center bg-black rounded-xl h-16 " onPress={onCheckout}>
              <ButtonText>Go To Checkout</ButtonText>
              <ArrowRight size={18} color="white" />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
