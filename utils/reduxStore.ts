// store.ts
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice'; // Update with the correct path

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer, // Sidebar reducer added to the store
    },
});

export default store;
