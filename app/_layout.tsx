import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";
import TabBar from "@/components/tabbar";

const queryClient = new QueryClient();
const RootLayout: React.FC = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
   
          <Tabs tabBar={(props) => <TabBar {...props} />}>
            {/* <Tabs.Screen
            name="index"
            options={{
              title: "index",
            }}
          />

          <Tabs.Screen
            name="Search"
            options={{
              title: "Search",
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              title: "Saved",
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: "Account",
            }}
          /> */}
          </Tabs>

      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
