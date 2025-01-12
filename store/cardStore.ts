import { Product } from '@/types';
import { create } from 'zustand';


export const useCartStore = create((set) => ({
    items: [],
    subTotal: 0,
    // if already in cart increase quantity else add to item   
    addProductToCart: (product: Product) =>
        set((state: { items: any[], subTotal: number }) => {
            const existingProductIndex = state.items.findIndex(item => item.product._id === product._id);
            let updatedItems;
            if (existingProductIndex !== -1) {
                updatedItems = state.items.map((item, index) =>
                    index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedItems = [...state.items, { product, quantity: 1 }];
            }
            const newSubTotal = updatedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
            return { items: updatedItems, subTotal: newSubTotal };
        }),
    
    removeProduct: (product: Product) =>
        set((state: { items: any[], subTotal: number }) => {
            const existingProductIndex = state.items.findIndex(item => item.product._id === product._id);
            if (existingProductIndex !== -1) {
                const existingProduct = state.items[existingProductIndex];
                let updatedItems;
                if (existingProduct.quantity > 1) {
                    updatedItems = state.items.map((item, index) =>
                        index === existingProductIndex ? { ...item, quantity: item.quantity - 1 } : item
                    );
                } else {
                    updatedItems = state.items.filter((_, index) => index !== existingProductIndex);
                }
                const newSubTotal = updatedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
                return { items: updatedItems, subTotal: newSubTotal };
            }
            return state;
        }),

    deleteProduct: (product: Product) =>
        set((state: { items: any[], subTotal: number }) => {
            const updatedItems = state.items.filter(item => item.product._id !== product._id);
            const newSubTotal = updatedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
            return { items: updatedItems, subTotal: newSubTotal };
        }),

    //  reset cart
    resetCart: () => set((state: { items: any[], subTotal: number }) => {
        return { items: [], subTotal: 0 };
    }),
}));