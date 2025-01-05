import { Badge, BadgeText } from "@/components/ui/badge";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon } from "@/components/ui/icon"; 
import { VStack } from "@/components/ui/vstack";
import "@/global.css";
import { useAuth } from "@/store/authStore";
import { useCartStore } from "@/store/cardStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { ShoppingCart, User } from "lucide-react-native";
import React from "react";
import {  TouchableOpacity } from "react-native";

const queryClient = new QueryClient();
const RootLayout: React.FC = () => {
  const cartItemNum = useCartStore((state: any) => state.items.length);
  const isLoggedIn = useAuth((state: any) => state.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href="/cart" asChild>
                <TouchableOpacity>
                  <VStack>
                    {cartItemNum !== 0 && (
                      <Badge
                        className="z-10 self-end h-[20px] w-[20px] bg-red-600 rounded-full -mb-3.5 -mr-3.5"
                        variant="solid"
                      >
                        <BadgeText className="text-white">{cartItemNum}</BadgeText>
                      </Badge>
                    )}
                    <Icon as={ShoppingCart} />
                  </VStack>
                </TouchableOpacity>
              </Link>
            ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Shop",
              headerTitleAlign: "center",
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Icon as={User} />
                    </TouchableOpacity>
                  </Link>
                ),
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
