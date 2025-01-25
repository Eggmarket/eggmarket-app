import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export const useField = create(
    persist(
        (set, get) => ({
            fields: [],
            addFields: (payload) => set(state => ({ fields: [...state.fields, payload] })),
            removeFields: (payload) => set(state => ({
                fields: state.fields.filter(value =>
                    payload !== value
                )
            })),
            removeAll: () => set({ fields: [] })
        }),
        {
            name: 'fields',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const useProfile = create(
    persist(
        (set, get) => ({
            userProfile: [],
            userSheba: [],
            addProfile: (payload) => set(state => {
                if (state.userProfile.length > 4) {
                    return state;
                }
                return { userProfile: [...state.userProfile, payload] };
            }),
            addSheba: (payload) => set(state => {
                if (state.userSheba.length > 4) {
                    return state;
                }
                return { userSheba: [...state.userSheba, payload] };
            }),
            removeProfile: (payload) => set(state => ({
                userProfile: state.userProfile.filter(value =>
                    payload !== value
                )
            })),
            removeSheba: (payload) => set(state => ({
                userSheba: state.userSheba.filter(value =>
                    payload !== value
                )
            })),
            removeAllProfile: () => set({ userProfile: [], userSheba: [] })
        }),
        {
            name: 'userProfile',
            storage: createJSONStorage(() => localStorage)
        }
    )
)