import { configureStore } from '@reduxjs/toolkit';
import CustomizationSlice from './slices/CustomizationSlice';

export const store = configureStore({
    reducer: {
        customization: CustomizationSlice
    }
});
