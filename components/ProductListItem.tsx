import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { Link } from "expo-router";
import { formatCurrency } from "../utils/formatter";
import { Product } from "@/types";
import { useSavedItemStore } from "@/store/savedItemStore";
import heartFilled from "../assets/Heart-filled.png";
import { Heart } from "lucide-react-native";

export function ProductListItem({ product }: { product: Product }) {
  const addItem = useSavedItemStore((state: any) => state.toggleItem);
  const savedItems = useSavedItemStore((state: any) => state.savedItems);

  const isSaved = savedItems.some((item: Product) => item._id === product._id);

  const handleAddItem = () => {
    addItem(product);
  };
  return (
    <Card
      className=" rounded-lg flex-1 "
      style={{
        maxWidth: "50%",
      }}
    >
      <Box
        className="flex-1 shadow-lg  bg-slate-100 relative rounded-xl mb-6 z-10 h-[174px]"
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        <Button
          size="lg"
          variant="solid"
          className=" top-4 right-4  z-100 p-3 bg-white hover:bg-gray-100 active:bg-gray-200 "
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            zIndex: 100,
            // opacity: 0.8
          }}
          onPress={handleAddItem}
        >
          {isSaved ? (
            <Image source={heartFilled} className={`h-5 w-5  `} />
          ) : (
            <ButtonIcon as={Heart} color={`${isSaved ? "red" : "black"}`} className={`h-5 w-5  `} />
          )}
        </Button>
        <Link href={`/product/${product._id}`}>
          {product.images.length > 0 && (
            <Image
              source={product.images[0].url}
              className=" h-full w-full rounded-xl aspect-[4/3] object-cover "
              alt={`${product.name} image`}
              resizeMode="contain"
            />
          )}
        </Link>
      </Box>
      <Heading size="md" className="text-sm mb-2 text-typography-700">
        {product.name}
      </Heading>
      <Text className="">{formatCurrency(product.price)}</Text>
    </Card>
  );
}
