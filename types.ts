

export interface Product {
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
