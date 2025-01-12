import React from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Bell, ChevronLeft } from "lucide-react-native";
import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { Icon } from "./ui/icon";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { useAuth } from "@/store/authStore";
import { Link } from "expo-router";
import { useRouter } from "expo-router"; 

const CustomHeader = ({
  title,
  rightComponent,
  leftComponent,
  right,
  left,
}: {
  title: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  right?: boolean;
  left?: boolean;
}) => {
  const router = useRouter();
  const logout = useAuth((state: any) => state.logout);

  return (
    <SafeAreaView className=" bg-background-0  border-b border-outline-200 ">
      <Box className="flex-row items-center justify-between text-black  p-4  shadow-md">
        {/* Back Button */}
        {left &&
          (leftComponent || (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="black" />
            </TouchableOpacity>
          ))}

        {/* Title */}
        <Text className="text-3xl font-bold">{title}</Text>

        {/* {rightComponent} */}
        {right && (
          <HStack space="lg" className=" items-center">
            <Link href="/notifications" asChild>
              <TouchableOpacity>
                <VStack>
                  <Icon size="xl" as={Bell} />
                </VStack>
              </TouchableOpacity>
            </Link>
          </HStack>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default CustomHeader;
