import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/user/userSlice';
import categoryReducer from '../redux/category/categorySlice';
import uploadReducer from '../redux/upload/uploadSlice';
import productReducer from '../redux/products/productSlice';
import orderReducer from '../redux/order/orderSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    categories : categoryReducer,
    upload:uploadReducer,
    product:productReducer,
    order:orderReducer,
  },
});
