import {defaultState} from "./context";

export const
    TOGGLE_TRUCK = 'TOGGLE_TRUCK',
    LOAD_TRUCKS = 'LOAD_TRUCKS',
    LOAD_TRUCK = 'LOAD_TRUCK',
    GET_SELECTED_TRUCK_FROM_LOCAL = 'GET_SELECTED_TRUCK_FROM_LOCAL',
    SET_SELECTED_TRUCK_FOR_LOCAL = 'SET_SELECTED_TRUCK_FROM_LOCAL',
    LOAD_ORDERS = "LOAD_ORDERS",
    SWITCH_ID = "SWITCH_ID",
    POST_ORDER = "POST_ORDER",
    DATETIME_CHANGE = "DATETIME_CHANGE",
    SET_MIN_PRICE = "SET_MIN_PRICE",
    SET_MAX_PRICE = "SET_MAX_PRICE",

    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAIL = "LOGIN_FAIL",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_FAIL = "LOGOUT_FAIL",
    AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS",
    AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL",

    LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS",
    LOAD_USER_PROFILE_FAIL = "LOAD_USER_PROFILE_FAIL"

export const reducer = (state, action) => {
// type, payload
    const { type, payload } = action
    console.log("REDUCER", type)
    switch(type) {
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            console.log("REGISTER_SUCCESS")
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS")
            return {
                ...state,
                isAuthenticated: true
            }
        case SET_MIN_PRICE:
            return {
                ...state,
                minPrice: payload.minPrice
            }
        case SET_MAX_PRICE:
            return {
                ...state,
                maxPrice: payload.maxPrice
            }
        case DATETIME_CHANGE:
            console.log("DATETIME_CHANGE")
            const newTime = new Date(payload.time).toJSON()
            return {
                ...state,
                time: newTime
            }
        case POST_ORDER:
            console.log("POST_ORDER")
            return {
                state
            }
        case SWITCH_ID:
            console.log("SWITCH_ID")
            return {
                ...state,
                selectedTruck: {},
                id: state.id == 0 ? 1 : 0
            }
        case LOAD_ORDERS:
            console.log("LOAD_ORDERS")
            return {
                ...state,
                orders: payload.orders
            }
        case LOAD_TRUCKS:
            console.log("LOAD_TRUCKS")
            return {
                ...state,
                trucks: payload.trucks,
                brands: payload.brands
            }
        case LOAD_TRUCK:
            console.log("LOAD_TRUCK SUCCESS")
            return {
                ...state,
                truck: payload.truck,
                brand: payload.brand
            }
        case TOGGLE_TRUCK:
            console.log("TOGGLE_TRUCK")
            if (state.selectedTruck == payload.id) {
                return {
                    ...state,
                    selectedTruck: {}
                }
            } else {
                return {
                    ...state,
                    selectedTruck: payload.id,
                }
            }

        case GET_SELECTED_TRUCK_FROM_LOCAL:
            console.log(`GET_SELECTED_TRUCK_FROM_LOCAL`)
            try {
                const raw = localStorage.getItem(`BMSTU USER: ${state.id}`) || {}
                const prepared = JSON.parse(raw)
                if (prepared.id == state.id) {
                    return {
                        ...state,
                        selectedTruck: prepared.selectedTruck,
                    }
                } else {
                    return state
                }
            } catch { return state }

        case SET_SELECTED_TRUCK_FOR_LOCAL:
            try {
            console.log(`SET_SELECTED_TRUCK_FOR_LOCAL`)
            localStorage.setItem(`BMSTU USER: ${state.id}`, JSON.stringify({
                id: state.id,
                selectedTruck: state.selectedTruck
            }))
            return state
            } catch { return state }
        default:
            return state
    }
}