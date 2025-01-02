import {} from "react-native";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Button, ButtonText } from "./ui/button";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { Link } from "expo-router";
import { formatCurrency } from "../utils/formatter";

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
      <Link
        href={ `/product/${product._id}` }
      > 
      {product.images.length > 0 && (
        <Image
          source={product.images[0].url}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
      )}</Link>
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {product.name}
      </Text> 
        <Heading size="md" className="">
          {formatCurrency(product.price)}
        </Heading>  
 
    </Card>
  );
}
