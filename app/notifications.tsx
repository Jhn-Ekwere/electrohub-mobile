import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Bell, CreditCardIcon, MapPin, Tag, UserCircle, Wallet } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Stack } from "expo-router";
import CustomHeader from "@/components/customHeader";
import { Center } from "@/components/ui/center";
import { Icon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";

interface Notifications {
  date: string;
  details: NotificationDetails[];
}

interface NotificationDetails {
  id: number;
  title: string;
  description: string;
  type: string;
}

const notifications: Notifications[] = [
  {
    date: "Today",
    details: [
      {
        id: 1,
        title: "30% Special Discount!",
        description: "Special promotion only valid today.",
        type: "discount",
      },
      {
        id: 2,
        title: "Top Up E-wallet Successfully!",
        description: "You have top up your e-wallet.",
        type: "wallet",
      },
    ],
  },
  {
    date: "Yesterday",
    details: [
      {
        id: 5,
        title: "New Service Available!",
        description: "Now you can track order in real-time.",
        type: "location",
      },
      {
        id: 3,
        title: "Credit Card Connected!",
        description: "Credit card has been linked.",
        type: "card",
      },
    ],
  },
  {
    date: "June 7, 2023",
    details: [
      {
        id: 5,
        title: "Account Setup Successfully!",
        description: "Your account has been created.",
        type: "account",
      },
    ],
  },
];

const NotificationsScreen = () => {
  return (
    <>
      <Stack.Screen
        name="Notifications"
        options={{
          header: () => <CustomHeader title="Notifications" left={true} right={true} />,
        }}
      />
      {notifications ? (
        <ScrollView className="bg-white flex-1">
          <Box className="p-6">
            <VStack space="lg">
              {notifications?.map((notification) => (
                <VStack
                  key={notification.date}
                  space="md"
                  className="p-4 border-t-hairline border-gray-200 rounded-md gap-2 "
                >
                  <Heading className=" ">{notification.date}</Heading>
                  {notification.details.map((notification) => (
                    <HStack key={notification.id} className="p-4 border-b border-gray-200 rounded-md items-center gap-2 ">
                      {notification.type === "discount" ? (
                        <Tag size="24" color="black" className="" />
                      ) : notification.type === "wallet" ? (
                        <Wallet size="24" color="black" className="" />
                      ) : notification.type === "location" ? (
                        <MapPin size="24" color="black" className="" />
                      ) : notification.type === "card" ? (
                        <CreditCardIcon size="24" color="black" className="" />
                      ) : notification.type === "account" ? (
                        <UserCircle size="24" color="black" className="" />
                      ) : null}
                      <View>
                        <Text className="text-lg font-semibold">{notification.title}</Text>
                        <Text className="text-gray-600">{notification.description}</Text>
                      </View>
                    </HStack>
                  ))}
                </VStack>
              ))}
            </VStack>
          </Box>
        </ScrollView>
      ) : (
        <Box className="items-center justify-center flex-1">
          <VStack space="lg" className=" items-center " style={{ width: 230 }}>
            <Bell size="48" color={"black"} />
            <Heading size="xl" className="mt-10 text-center ">
              You haven't gotten any notifications yet!
            </Heading>
            <Text className="underline mt-4 text-center ">We'll alert you when something cool happens.</Text>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default NotificationsScreen;
