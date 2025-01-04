import { create } from 'zustand';


export const useCartStore = create((set) => ({
    items: [],
    // if already in cart increase quantity else add to item   
    addProductToCart: (product: any) =>
        set((state: { items: any[] }) => {
            const existingProductIndex = state.items.findIndex(item => item.product.id === product.id);
            if (existingProductIndex !== -1) {
                const updatedItems = state.items.map((item, index) => 
                    index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                return { items: updatedItems };
            } else {
                return { items: [...state.items, { product, quantity: 1 }] };
            }
        }),


    //  reset cart
    resetCart: () => set({ items: [] }),
}));