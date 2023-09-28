import { configureStore } from '@reduxjs/toolkit'
import products from './features/products'

export default configureStore({
    reducer: {
        products
    }
})