import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { ArrowLeftIcon } from "lucide-react-native";

const CustomHeader = ({ title, rightComponent }: { title: string; rightComponent?: React.ReactNode }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between bg-blue-500 p-4 shadow-md">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-lg font-bold">{title}</Text>

      {/* Optional Right Action (e.g., Profile Icon) */}
      <TouchableOpacity>{rightComponent}</TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
