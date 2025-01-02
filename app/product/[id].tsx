 
import { products } from '@/assets/product'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { formatCurrency } from '@/utils/formatter'
import { P } from '@expo/html-elements'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

const details = () => {
  const { id } = useLocalSearchParams()
  
  const product = products.find(p => p._id === id)


  if (!product) {
    return <Text>Product not found</Text>
  }

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
          {product.name}
      </Text>
      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          {formatCurrency(product.price)}
        </Heading>
        <Text size="sm" isTruncated>
          {product.description}
        </Text>
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

export default details