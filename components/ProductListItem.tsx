import {} from "react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Button, ButtonText } from "./ui/button";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";

interface Product {
  _id: string;

  name: string;

  category: { _id: string; name: string; description: string }[];

  subcategory: { _id: string; name: string; description: string }[];

  dataSheet?: string;

  manufacturer: string;

  images: { public_id: string; url: string; _id: string }[];

  price: number;

  description: string;

  discount: number;

  isFeatured?: boolean;
}

export function ProductListItem({ product }: { product: Product }) {
  return (
    <Card className="p-5 rounded-lg max-w-[360px]  flex-1 ">
      {product.images.length > 0 && (
        <Image
          source={product.images[0].url}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
      )}
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {product.category.map((cat) => cat.name).join(", ")}
      </Text>
      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          {product.name}
        </Heading>
        {/* <Text size="sm" isTruncated>
          {product.description}
        </Text> */}
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        <Button variant="outline" className="px-4 py-2 border-outline-300 sm:flex-1">
          <ButtonText size="sm" className="text-typography-600">
            Wishlist
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
