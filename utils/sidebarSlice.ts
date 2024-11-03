// sidebarSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: true, // Initially, the sidebar is closed
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen; // Toggle the sidebar state
        },
    },
});

// Export actions
export const { toggleSidebar } = sidebarSlice.actions;

// Export the reducer
export default sidebarSlice.reducer;
