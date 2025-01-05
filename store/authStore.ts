import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = create(
    persist((set) => ({
        isAuthenticated: false,
        token: null,
        isEmailVerified: false,
        role: null,
        profilePicture: null,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        address: null,
        phone: null,
        likes: null,
        dateOfBirth: null,
        wishlist: null,
        cart: null,
        loginSuccess: (user: any) => set({
            isAuthenticated: true,
            token: user.token,
            isEmailVerified: user.isEmailVerified,
            role: user.role,
            profilePicture: user.profilePicture,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            phone: user.phone,
            likes: user.likes,
            dateOfBirth: user.dateOfBirth,
            wishlist: user.wishlist,
            cart: user.cart
        }),
        // logout
        logout: () => set({
            isAuthenticated: false,
            token: null,
            isEmailVerified: false,
            role: null,
            profilePicture: null,
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            address: null,
            phone: null,
            likes: null,
            dateOfBirth: null,
            wishlist: null,
            cart: null
        })



    }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    ))


