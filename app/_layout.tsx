import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";
import React from "react";

const RootLayout: React.FC = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack />
    </GluestackUIProvider>
  );
};

export default RootLayout;
