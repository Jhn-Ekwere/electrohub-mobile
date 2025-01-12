import React from "react";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { SearchIcon, SlidersHorizontal } from "lucide-react-native";
import { HStack } from "./ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { FlatList } from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetSectionHeaderText,
} from "@/components/ui/actionsheet";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "./ui/slider";
import { Center } from "./ui/center";

const sortOptions = [
  {
    name: "Newest",
    icon: "Clock",
  },
  {
    name: "Oldest",
    icon: "Clock",
  },
  {
    name: "Price: Low to High",
    icon: "DollarSign",
  },
  {
    name: "Price: High to Low",
    icon: "DollarSign",
  },
];

const SearchBar = ({ setSearchText }: { setSearchText: (text: string) => void }) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  return (
    <Box className=" p-4 gap-2 flex-row flex-1 items-center">
      <Box className=" gap-2 flex-row flex-1 items-center  ">
        <Input className="flex-1  border h-[52px] rounded-lg ">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." className="flex-1   " onChangeText={(value) => setSearchText(value)} />
        </Input>
      </Box>
      <Button
        variant="solid"
        className="p-2 h-[52px] w-[52px] rounded-lg bg-black "
        onPress={() => setShowActionsheet(true)}
      >
        <ButtonIcon as={SlidersHorizontal} size="xl" className=" text-white transform rotate-[90deg] " />
      </Button>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="rounded-t-lg   ">
          <ActionsheetDragIndicatorWrapper
            className="w-16  rounded-full py-1 items-center justify-center "
            style={{
              backgroundColor: "#E6E6E6",
            }}
          >
            <ActionsheetDragIndicator className=" " />
          </ActionsheetDragIndicatorWrapper>

          <ActionsheetSectionHeaderText className=" text-left font-bold text-lg text-black lowercase w-full">
            Filters
          </ActionsheetSectionHeaderText>
          <ActionsheetItem>
            <VStack space="md" className="flex-1">
              <ActionsheetItemText bold size="md">
                Sort By
              </ActionsheetItemText>
              <FlatList
                data={sortOptions}
                keyExtractor={(item) => item.name}
                horizontal
                renderItem={({ item }) => (
                  <Button variant="outline" className="rounded-lg mr-2   " onPress={handleClose}>
                    <ButtonText className="text-black">{item.name}</ButtonText>
                  </Button>
                )}
                ItemSeparatorComponent={() => <Box className="w-2" />}
              />
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem>
            <VStack space="md" className="flex-1">
              <HStack space="md" className=" items-center justify-between">
                <ActionsheetItemText bold size="md">
                  Price
                </ActionsheetItemText>
                <ActionsheetItemText>$ 0 - $ 19</ActionsheetItemText>
              </HStack>

              <Slider
                size="md"
                orientation="horizontal"
                isDisabled={false}
                isReversed={false}
                className=" flex-1"
                defaultValue={100}
              >
                <SliderTrack className="bg-black">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb className=" bg-black" />
              </Slider>
            </VStack>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <Button size="xl" className=" bg-black flex-1 rounded-lg ">
              <ButtonText>Appy Filters</ButtonText>
            </Button>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default SearchBar;
