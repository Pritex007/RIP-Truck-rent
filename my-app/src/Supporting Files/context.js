import React from 'react'


export const defaultState = {
    trucks: [],
    selectedTruck: {},
    brands: [],
    openedTruck: {},
    openedBrand: {},
    orders: [],
    id: 0,
    time: new Date().toLocaleDateString()
}

export const Context = React.createContext(defaultState);