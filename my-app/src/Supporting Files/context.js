import React from 'react'


export const defaultState = {
    trucks: [],
    selectedTruck: {},
    brands: [],
    openedTruck: {},
    openedBrand: {},
    orders: [],
    id: 0,
    time: new Date().toLocaleDateString(),
    minPrice: 0,
    maxPrice: 100000,
    isAuthenticated: false
}

export const Context = React.createContext(defaultState);