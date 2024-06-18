import { configureStore } from '@reduxjs/toolkit'
import orderBooking from './features/orderBooking'

export default configureStore({
    reducer: {
        orderBooking
    }
})