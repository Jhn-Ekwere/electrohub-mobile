import { create } from 'zustand';


interface SavedItemStore {
    savedItems: any[];    
    clearItems: () => void;
}

export const useSavedItemStore = 
create<SavedItemStore>((set) => ({
    savedItems: [],
    toggleItem: (item: any) => set((state) => ({
        savedItems: state.savedItems.includes(item)
            ? state.savedItems.filter((savedItem) => savedItem !== item)
            : [...state.savedItems, item]
    })),
    clearItems: () => set({ savedItems: [] })
}));