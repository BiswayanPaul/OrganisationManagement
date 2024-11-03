export interface SidebarState {
    isOpen: boolean;
}

export type SidebarAction =
    | { type: 'TOGGLE_SIDEBAR' };
