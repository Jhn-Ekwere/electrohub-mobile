import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = create(
    persist((set) => ({
        user: {
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
        },
        loginSuccess: (state: any) => set({
            user: {
                isAuthenticated: true,
                token: state.token,
                isEmailVerified: state.isEmailVerified,
                role: state.role,
                profilePicture: state.profilePicture,
                id: state.id,
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                address: state.address,
                phone: state.phone,
                likes: state.likes,
                dateOfBirth: state.dateOfBirth,
                wishlist: state.wishlist,
                cart: state.cart
            }
        }),
        // logout
        logout: () => set({
            user: {
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
            }
        })



    }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    ))


