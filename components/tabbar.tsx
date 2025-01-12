import { Pressable } from "react-native";
import { Text } from "@react-navigation/elements";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { HStack } from "./ui/hstack";
import { Heart, Home, SearchIcon, ShoppingCart, UserCircle } from "lucide-react-native";
import { useCartStore } from "@/store/cardStore";
import { VStack } from "./ui/vstack";
import { Badge, BadgeText } from "./ui/badge";
import { useSegments } from "expo-router";
import { View } from "react-native";

interface IconProps {
  color: string;
}

interface Icons {
  [key: string]: (props: IconProps) => JSX.Element;
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const segments = useSegments();

  const shouldHideTabBar = segments.some((segment) => ["auth", "id", "search", "product"].includes(segment));

  const cartItemNum = useCartStore((state: any) => state.items.length);
  const icons: Icons = {
    home: (props) => <Home size={26} {...props} />,
    search: (props) => <SearchIcon size={26} {...props} />,
    saved: (props) => <Heart size={26} {...props} />,
    cart: (props) => (
      <VStack>
        {cartItemNum !== 0 && (
          <Badge className="z-10 self-end h-[20px] w-[20px] bg-red-600 rounded-full -mb-3.5 -mr-3.5" variant="solid">
            <BadgeText className="text-white">{cartItemNum}</BadgeText>
          </Badge>
        )}
        <ShoppingCart size={26} {...props} />
      </VStack>
    ),
    account: (props) => <UserCircle size={26} {...props} />,
  };

  let routez = state.routes;
  const reorderedRoutes = (() => {
    const otherRoutes = routez.filter((route) => !["home", "search", "saved", "cart"].includes(route.name));
    const orderedRoutes = [
      ...routez.filter((route) => route.name === "home"),
      ...routez.filter((route) => route.name === "search"),
      ...routez.filter((route) => route.name === "saved"),
      ...routez.filter((route) => route.name === "cart"),
      ...otherRoutes,
    ];
    return orderedRoutes;
  })();
  const stateRoutes = reorderedRoutes;

  return !shouldHideTabBar ? (
    <HStack
      space="md"
      className=" items-center absolute bottom-0 justify-center  p-4 flex-1 bg-white shadow-md rounded-full m-4 "
    >
      {stateRoutes.map((route) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.routes[state.index]?.key === route.key;

        if (
          ["_sitemap", "+not-found", "(auth)/login", "index", "notifications", "product/[id]", "profile"].includes(
            route.name
          )
        )
          return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.name,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center "
          >
            {icons[route?.name] &&
              icons[route?.name]({
                color: isFocused ? "black" : "#999999",
              })}
            <Text
              className=" capitalize"
              style={{ color: isFocused ? "black" : "#999999", textTransform: "capitalize" }}
            >
              {typeof label === "function"
                ? label({
                    focused: isFocused,
                    color: isFocused ? "black" : "#999999",
                    position: "below-icon",
                    children: "",
                  })
                : label}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  ) : (
    <View className=" items-center absolute bottom-0 justify-center   flex-1 bg-white shadow-md rounded-full  " />
  );
};

export default TabBar;
