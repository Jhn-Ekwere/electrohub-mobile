import React from "react";
import { useCartStore } from "@/store/cardStore"; 
import { FlatList } from "react-native"; 
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";

const Cart = () => {
  const items = useCartStore((state:any) => state.items);
  const resetCart = useCartStore((state:any) => state.resetCart);

  const onCheckout = async () => {
    // send order to server
    resetCart()
  }
  

  if (items.length === 0) {
    return <Redirect href="/"/>;
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <HStack className="p-4 max-w-[950px] w-full m-1 bg-white ">
          <VStack space="sm">
            <Text className="text-lg font-semibold">{item.product.name}</Text>
            <Text className="">${item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      // checkout
      ListFooterComponent={() => (
        <Button onPress={onCheckout} >
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
};

export default Cart;
