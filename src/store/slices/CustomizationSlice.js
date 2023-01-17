// project imports
import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const CustomizationSlice = createSlice({
    name: 'customization',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        openMenu: (state, action) => {
            state.isOpen = [action.payload];
        },
        setMenu: (state, action) => {
            state.opened = action.payload;
        },

        setFontFamily: (state, action) => {
            state.fontFamily = action.payload;
        },

        setBorderRadius: (state, action) => {
            state.borderRadius = action.payload;
        }
    }
});

export const { openMenu, setMenu, setFontFamily, setBorderRadius } = CustomizationSlice.actions;
export default CustomizationSlice.reducer;
